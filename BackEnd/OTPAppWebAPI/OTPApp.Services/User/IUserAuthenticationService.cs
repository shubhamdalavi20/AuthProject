using OTPApp.DTO.User.Login;
using OTPApp.DTO.User.Registration;

namespace OTPApp.Services.User
{
    public interface IUserAuthenticationService
    {
        /// <summary>
        /// To register new user
        /// </summary>
        /// <param name="param">UserRegistrationDTO object</param>
        /// <returns>Token</returns>
        
        public Task<int> Registration(UserRegistrationDTO param);
        /// <summary>
        /// To login into application
        /// </summary>
        /// <param name="param">UserLoginDTO object</param>
        /// <returns>Response of verification of login</returns>
        
        public Task<int> Login(UserLoginDTO param);

        /// <summary>
        /// To get otp to login into application
        /// </summary>
        /// <param name="param">UserRegistrationDTO object</param>
        /// <returns>Response of OTP</returns>
        public Task<UserOTPDTO> GetOTP(UserRegistrationDTO param);
    }
}
