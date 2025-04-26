import ProfileCard from "../components/ProfileCard";

export default function Profile(){
    const user = {
        firstName:"john",
        lastName: "pork",
        email: "jpork@uw.edu",
        phone: "123-456-7890",
        profession: "professional pig",
        districtID: "1",
        bio: "pick up"
      }

    return (
        <ProfileCard user={user}/>
    )
}