import React from "react";
import Header from "../Layout/Header";
import AddRandomContact from "./AddRandomContact";
import RemoveAllContact from "./RemoveAllContact";
import AddContact from "./AddContact";
import FavoriteContacts from "./FavoriteContacts";
import GeneralContacts from "./GeneralContacts";
import Footer from "../Layout/Footer";

class ContactIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contactList : [
                {
                    id : 1,
                    name: "Time Show",
                    phone: "123-123-1234",
                    email: "timeshow@email.com",
                    isFavorite: false
                },
                {
                    id : 2,
                    name: "Port Grand",
                    phone: "983-9876-9988",
                    email: "portGrand@email.com",
                    isFavorite: true
                },
                {
                    id : 3,
                    name: "Jhon Black",
                    phone: "00-100-1000",
                    email: "jhonblack@email.com",
                    isFavorite: true
                }
            ],
            selectedContact : undefined,
            isUpdating : false,
        }
    }

    handleAddContact = (newContact) =>{
        if(newContact.name === ""){
            return ({status: "Failed", msg:"Please enter a valid name."})
        }else if(newContact.phone === ""){
            return ({status: "Failed", msg:"Please enter a valid phone number."})
        }

        const duplicateRecord = this.state.contactList.filter(x =>{
            if(x.name === newContact.name && x.phone === newContact.phone){
                return true;
            }

            return false;
        })

        if(duplicateRecord.length > 0){
            return ({status: "Failed", msg:"Duplicate Record"})
        }else{

            const newFinalContact = {...newContact,id:this.state.contactList[this.state.contactList.length-1].id + 1
                ,isFavorite:false,
            };
            this.setState((prevState)=>{
                return{
                    contactList: prevState.contactList.concat([newFinalContact]),
                }
            })

            return ({status: "success", msg:"Contact was added successfully."})
        }
    }

    handleToggleClick = (contact) =>{
        this.setState((prevState) =>{
            return{
                contactList : prevState.contactList.map( (obj) => {
                    if(obj.id === contact.id){
                        return{...obj,isFavorite: !obj.isFavorite}
                    }

                    return obj;
                })
            }
        })
    }

    handleToggleDelete = (contactId) =>{
        this.setState((prevState) =>{
            return {
                contactList : prevState.contactList.filter( obj => {
                    return obj.id !== contactId;
                })
            }
        })
    }
    handleAddRandomContact = (newContact) =>{
        const newFinalContact = {...newContact,id:this.state.contactList[this.state.contactList.length-1].id + 1
            ,isFavorite:false,
        };
        this.setState((prevState)=>{
            return{
                contactList: prevState.contactList.concat([newFinalContact]),
            }
        })
    }

    handleRemoveAllContact = () =>{
        this.setState(()=>{
            return{
                contactList: [],
            }
        })
    }

    handleUpdateClick = (contact) =>{
        console.log(contact);
        this.setState(() =>{
            return{
                selectedContact : contact,
                isUpdating : true
            }
        })
    }

    handleCancelUpdateContact = () =>{
        this.setState(() =>{
            return{
                selectedContact : undefined,
                isUpdating : false
            }
        })
    }

    handleUpdateContact = (updatedContact) =>{
        if(updatedContact.name === ""){
            return ({status: "Failed", msg:"Please enter a valid name."})
        }else if(updatedContact.phone === ""){
            return ({status: "Failed", msg:"Please enter a valid phone number."})
        }
        
        this.setState((prevState)=>{
            return{
                contactList: prevState.contactList.map((obj) =>{
                    if(obj.id == updatedContact.id){
                        return {
                            ...obj,
                            name : updatedContact.name,
                            email : updatedContact.email,
                            phone : updatedContact.phone,
                            id: updatedContact.id
                        }
                    }
                    return obj; 
               }),
               isUpdating : false,
               selectedContact : undefined
            }
        })

            return ({status: "success", msg:"Contact was added successfully."})
    }

    render(){
        return(
            <div>
                <Header></Header>
                <div className="container" style={{minHeight: "85vh"}}>
                    <div className="row py-3">
                        <div className="col-4 offset-2 row">
                            <AddRandomContact handleAddRandomContact={this.handleAddRandomContact}/>
                        </div>
                        <div className="col-4 row">
                            <RemoveAllContact handleRemoveAllContat={this.handleRemoveAllContact}></RemoveAllContact>
                        </div>
                        <div className="row py-2">
                            <div className="col-8 offset-2 row">
                                <AddContact handleAddContact={this.handleAddContact}
                                            isUpdating={this.state.isUpdating}
                                            selectedContact={this.state.selectedContact}
                                            cancelUpdateContact={this.handleCancelUpdateContact}
                                            updateContact={this.handleUpdateContact}></AddContact>
                            </div>                           
                        </div>
                        <div className="row py-2">
                            <div className="col-8 offset-2 row">
                                <FavoriteContacts 
                                    contacts={this.state.contactList.filter((u) => u.isFavorite === true)}
                                    favoriteClick={this.handleToggleClick}
                                    deleteClick={this.handleToggleDelete}
                                    updateClick={this.handleUpdateClick}>

                                </FavoriteContacts>
                            </div>
                        </div>
                        <div className="row py-2">
                            <div className="col-8 offset-2 row">
                                <GeneralContacts contacts={this.state.contactList.filter((u) => u.isFavorite === false)}
                                                 favoriteClick={this.handleToggleClick}
                                                 deleteClick={this.handleToggleDelete}
                                                 updateClick={this.handleUpdateClick}>
                                </GeneralContacts>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

export default ContactIndex;