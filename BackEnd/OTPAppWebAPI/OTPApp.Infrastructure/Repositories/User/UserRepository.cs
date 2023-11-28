using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OTPApp.DataEFCore;
using OTPApp.DTO.User;
using OTPApp.DTO.User.Registration;
using OTPApp.Entities.User;
using System.Security.Cryptography;
using System.Text;
using System.Xml.Linq;

namespace OTPApp.Infrastructure.Repositories.User
{
    public class UserRepository : IUserRepository
    {
        #region Private Members
        private readonly AppDBContext _context;
        private readonly IMapper _mapper;
        #endregion

        #region Constructor
        /// <summary>
        /// Constructor initialization
        /// </summary>
        /// <param name="context">Databes context</param>
        /// <param name="mapper">Imapper object</param>
        public UserRepository(AppDBContext context, IMapper mapper) { 
            _context = context;
            _mapper = mapper;
        }
        #endregion
        #region Public Methods
        public async Task<int> Add(UserDTO param)
        {
            var existing = await _context.Users.AnyAsync(user => user.UserName == param.UserName);
            if (existing) {
                return 0; // username already exist
            }
            else
            {
                _context.Users.Add(_mapper.Map<UserEntity>(param));
                await _context.SaveChangesAsync();
                return 1; //successfull
            }
        }

        public async Task<UserDTO> Get(string name)
        {
            return _mapper.Map<UserDTO>(await _context.Users.FirstOrDefaultAsync(user => user.UserName == name));
        }

        public async Task<int> Update(int id, UserDTO param)
        {
            var oldUser =  _context.Users.FirstOrDefault(user => user.ID == id);
            if(oldUser != null)
            {
                oldUser.PasswordSalt = param.PasswordSalt;
                oldUser.PasswordHash = param.PasswordHash;
                oldUser.VerifiedAt = param.VerifiedAt;
            }
            return await _context.SaveChangesAsync();
        }
        #endregion
    }
}
