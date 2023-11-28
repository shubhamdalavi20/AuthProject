using System.ComponentModel.DataAnnotations;

namespace OTPApp.DTO.User.Login
{
    public class UserLoginDTO
    {
        [Required]
        public string UserName { get; set; } = string.Empty;
        
        [Required]
        public string OTP { get; set; } = string.Empty;
        
    }
}
