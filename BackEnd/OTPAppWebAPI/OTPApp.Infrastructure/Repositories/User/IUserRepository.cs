using OTPApp.DTO.User;
using OTPApp.DTO.User.Registration;

namespace OTPApp.Infrastructure.Repositories.User
{
    public interface IUserRepository
    {
        /// <summary>
        /// To get user by name
        /// </summary>
        /// <param name="name">name of a user that we want</param>
        /// <returns>User</returns>
        Task<UserDTO> Get(string name);

        /// <summary>
        /// To add new user 
        /// </summary>
        /// <param name="param">user that we want to add</param>
        /// <returns>Response of operation</returns>
        Task<int> Add(UserDTO param);

        /// <summary>
        /// To update an existing user
        /// </summary>
        /// <param name="id">id of a user that we want to update</param>
        /// <param name="param">user that we want to update</param>
        /// <returns>Response of operation</returns>
        Task<int> Update(int id, UserDTO param);
    }
}
