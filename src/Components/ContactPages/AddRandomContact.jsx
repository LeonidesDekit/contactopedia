import {getRandomUser} from "../../Utility/api"

const GetRandomUser = async (props) =>{
    const responseAPI = await getRandomUser();
    console.log(responseAPI);

    return props.handleAddRandomContact({
        name : responseAPI.data.first_name + " " + responseAPI.data.last_name,
        phone : responseAPI.data.phone_number,
        email : responseAPI.data.email
    })
}

const AddRandomContact = (props) =>{
    return(
        <div>
            <button className="btn btn-success form-control" onClick={() => GetRandomUser(props)}>
                Add Random Contact
            </button>
        </div>
    )
}

export default AddRandomContact;