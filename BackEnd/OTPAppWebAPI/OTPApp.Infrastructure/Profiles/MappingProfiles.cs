using AutoMapper;
using OTPApp.DTO.User;
using OTPApp.Entities.User;

namespace OTPApp.Infrastructure.Profiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<UserEntity, UserDTO>().ReverseMap();
        }
    }
}
