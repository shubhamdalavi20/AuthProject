using Common.DTO;

namespace OTPApp.DTO.User
{
    public class UserDTO : BaseDTO
    {
        public string UserName { get; set; } = string.Empty;
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }
        public DateTime? VerifiedAt { get; set; }
    }
}
