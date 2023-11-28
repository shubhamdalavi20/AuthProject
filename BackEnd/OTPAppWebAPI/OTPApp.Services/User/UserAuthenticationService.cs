using Microsoft.Extensions.Configuration;
using OTPApp.DTO.User;
using OTPApp.DTO.User.Login;
using OTPApp.DTO.User.Registration;
using OTPApp.Infrastructure.Repositories.User;
using System.Security.Cryptography;
using System.Text;

namespace OTPApp.Services.User
{
    public class UserAuthenticationService : IUserAuthenticationService
    {
        #region Private Members
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        #endregion
        #region Constructor
        /// <summary>
        /// Constructor initialization
        /// </summary>
        /// <param name="userRepository">User Repository</param>
        public UserAuthenticationService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }
        #endregion

        #region Public Methods
        public async Task<int> Registration(UserRegistrationDTO param)
        {
            var user = new UserDTO
            {
                UserName = param.UserName
            };

            return await _userRepository.Add(user);
        }

        public async Task<UserOTPDTO> GetOTP(UserRegistrationDTO param)
        {
            var user = await _userRepository.Get(param.UserName);
            if (user == null)
            {
                return new UserOTPDTO { OTP = string.Empty, Response = 2 };
            }
            else
            {
                Random generator = new Random();
                var otp = generator.Next(000000, 999999).ToString("D6");
                CreatePasswordHash(otp, out byte[] passwordHash, out byte[] passwordSalt);
                var userToUpdate = new UserDTO
                {
                    ID = user.ID,
                    UserName = user.UserName,
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt,
                    VerifiedAt = DateTime.UtcNow
                };
                await _userRepository.Update(user.ID, userToUpdate);

                return new UserOTPDTO { ID = user.ID, UserName = user.UserName,  OTP = otp, Response = 1 };
            }
        }

        public async Task<int> Login(UserLoginDTO param)
        {
            var user = await _userRepository.Get(param.UserName);
            if (user == null || string.IsNullOrEmpty(param.OTP))
            {
                return 2; // wrong user or otp
            }
            else
            {
                if (!user.VerifiedAt.HasValue)
                {
                    return 0; //bad request
                }
                var userDate = DateTime.UtcNow;
                if (user.VerifiedAt.HasValue)
                    userDate = (DateTime)user.VerifiedAt;

                var timeExpire = DateTime.Compare(DateTime.UtcNow, userDate.AddSeconds(30));
                if(timeExpire > 0 ) 
                { return 3; } // OTP is Expired!

                if (user.PasswordHash != null && user.PasswordSalt != null && VerifyPasswordHash(param.OTP, user.PasswordHash, user.PasswordSalt))
                {
                    return 1; //success
                }
                else
                {
                    return 2; // wrong user or otp
                }
            }
        }
        #endregion

        #region Private Methods
        private void CreatePasswordHash(string otp, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(otp));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHas = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHas.SequenceEqual(passwordHash);
            }
        }
        #endregion

    }
}
