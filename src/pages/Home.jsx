import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { writeUserData, updateDB, removeDB } from "../firebase";
import { getDatabase, ref, child, get } from "firebase/database";
import edit from "../images/edit.gif";
import trash from "../images/trash.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./home.css";

function Home() {
 
  const [userName, setUserName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [UserdataBase, setUserdataBase] = useState();
  const [gender, setGender] = useState();
  const [ListOfCountry, setListOfCountry] = useState();
  const [countryData, setCountryData] = useState();
  const [country, setCountry] = useState();
  const [updateButton, setupdateButton] = useState(false)
  // const [countryName, setCountryName] = useState();
  const navigate = useNavigate()
  const [avatar, setAvatar] = useState();
  const [id, setId] = useState(0);
  const [num,setNum] = useState(5)

  const avatarList = [
    "😁",
    "😊",
    "😂",
    "🤣",
    "🐮",
    "😍",
    "😒",
    "🤷‍♂️",
    "🤦‍♀️",
    "😎",
    "😶‍🌫️",
    "😏",
    "🥶",
    "😱",
    "🥵",
    "🤢",
    "🤕",
    "🥸",
    "🤓",
    "🧐",
    "🤥",
    "🐼",
    "🐒",
    "🐈‍⬛",
    "🦬",
    "🐫",
    "🐇",
    "🐿️",
    "🐾",
    "🐸",
    "🐧",
    "🦋",
    "🪰",
    "🐞",
  ];

  //fetch all country from restcountries.com
  const fetchAllCountry = async () => {
    const url = `https://restcountries.com/v3.1/all`;
    await fetch(url)
      .then((res) => {
        if (!res.ok) {
          alert(`Something went wrong: ${res.status}`);
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        setCountryData(data);
        return data;
      })
      .then((data) => selectcountry(data))
      .then((item) => setListOfCountry(item))
      .catch((err) =>{
        const notify = () =>
        toast.warn(`Something went wrong: ${err}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      notify();
        console.log(err)
      });
  };

  //to create all options according to the data and sort it
  const selectcountry = (Countries) => {
    // console.log(Countries);
    let countryList = [];
    let countryListId = {};
    //sort the list of countries and collect id of all countries
    for (let i = 0; i < Countries.length; i++) {
      countryList.push(Countries[i].name.common);
      countryListId[Countries[i].name.common] = i;
    }
    // console.log(countryListId);
    //to sort it alphabetically
    countryList = countryList.sort();
    // console.log(countryList);
    return countryList;
  };

  useEffect(() => {
    read();
    fetchAllCountry();
    randomGenerator()
  }, []);

  //read database
  function read() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          const db = snapshot.val();
          let data = Object.entries(db);
          // console.log(data);
          let data2 = [];
          data.map((item) =>  data2.push(item[0]));
          data2 = data2.sort();
          let finaldata = [];
          data2.map((item) => {
            return (
              data.map((x) => {
                if (x[0] === item) {
                  let a = [`${item}`, x[1]];
                  finaldata.push(a);
                }
              })
            )
          
          });
          // console.log(finaldata);
          // console.log(data);
          setUserdataBase(Object.entries(db));
        } else {
          console.log("No data available");
          setUserdataBase();
          return "No data available";
        }
      })
      .catch((error) => {
        console.error(error);
      });
      randomGenerator()
  }

  const addUser = (e) => {
    e.preventDefault();
    console.log(id);
    if (id !==0) {
      const selectedCountryData = countryData?.filter(
        (item) => item.name.common === country
      );
      console.log( selectedCountryData[0]);
      removeDB(id);
      updateDB(
        id,
        avatar,
        userName,
        phoneNumber,
        gender,
        selectedCountryData[0]?.flags.png,
        selectedCountryData[0]?.name.common
      );
      const notify = () =>
    toast.success('User successfully updated', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  notify();
    } else {
      const selectedCountryData = countryData?.filter(
        (item) => item.name.common === country
      );
      console.log(selectedCountryData[0]?.flags.png);
      let id = Number(
        new Date()
          .toString()
          .slice(8, 25)
          .replaceAll(" ", "")
          .replaceAll(":", "")
      );
      // console.log(flag);
      writeUserData(
        id,
        avatar,
        userName,
        phoneNumber,
        gender,
        selectedCountryData[0].flags.png,
        selectedCountryData[0]?.name.common
      );
      const notify = () =>
    toast.success('User successfully added', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  notify();
    }
    setUserName("");
    setPhoneNumber("");
    setId(0)
    read();
    randomGenerator()
    setupdateButton(false)
  };
  const updateUser = (e) => {
    e.preventDefault();
    const num = e.target.className.slice(11);
    setId(num)
    console.log(id);
    console.log(UserdataBase);
    UserdataBase.map((item) => console.log(typeof item[0]));
    console.log(typeof e.target.className.slice(11));
    const targetUser = UserdataBase.filter(
      (item) => item[0] === e.target.className.slice(11)
    );
    console.log(targetUser);
    const name = targetUser[0][1].username;
    setUserName(name);
    // console.log(userName);
    const phone = targetUser[0][1].phone;
    setupdateButton(true)
    setPhoneNumber(phone);
    // const countryName = targetUser[0][1].countryName;
    //  setCountryName(countryName);
    // console.log(countryName);
    // const gender = targetUser[0][1].gender;
    // setGender(gender);
    // const avatar = targetUser[0][1].avatar;
    // setAvatar(avatar);
    randomGenerator()
    // console.log(phoneNumber);
  };
  // this is for backgrounImage
  const randomGenerator =()=>{
    setNum(Math.floor(Math.random()*24))
    return num
  }

  const deleteavatar = (e) => {
    e.preventDefault();
    removeDB(Number(e.target.className.slice(6)));
    read();
    const notify = () =>
    toast.warn('User deleted!!!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  notify();
    randomGenerator()
  };
  console.log(num);
console.log(UserdataBase);
console.log(country);
  return (
    <div className="combo row-md-11 row-sm-12" style={{  
      backgroundImage: `url(${require(`../images2/${num}.jpg`)})`,
      // backgroundPosition: 'center',
      // backgroundSize: 'cover',
      // backgroundRepeat: 'no-repeat',
      // backgroundAttachment: "fixed"
    }}>
      <div className="inputs col-md-3 col-sm-10">
        <Form onSubmit={addUser}>
          <h6>User Name</h6>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Name"
              required
              maxLength={10}
              value={userName || ""}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
          <h6>Phone Number</h6>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="number"
              placeholder="Phone Number"
              required
              className="phoneNumber"
              value={phoneNumber || ""}
              maxLength={10}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Group>
          <h6>Gender</h6>
          <Form.Select  required onClick={(e) => setGender(e.target.value)}>
            <option>Female</option>
            <option>Male</option>
          </Form.Select>
          <br />
          <h6>Country</h6>
          <Form.Select required onClick={(e) => setCountry(e.target.value)}>
            {ListOfCountry?.map((country, key) => (
              <option key={key}>{country}</option>
            ))}
          </Form.Select>
          <br />
          <h6>Avatar</h6>
          <div className="avatars col-md-4">
          <Form.Select  required onClick={(e) => setAvatar(e.target.value)}>
            {avatarList.map((item, key) => (
              <option key={key}>{item}</option>
            ))}
          </Form.Select>
          </div>
      
          <br />
          <Button variant="primary" type="submit">
            {updateButton === false ? "Add User" : "Update"}
          </Button>
        </Form>
      </div>
      {UserdataBase?.length>0 && <div className="list col-md-6">
        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>User Name</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Country</th>
              <th>Avatar</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {UserdataBase?.map((user, key) => {
              return (
                <tr className="line" typeof="button" key={user[0]} >
                  <td onClick={()=>navigate(`details`,{state:user})}>{key + 1}</td>
                  <td onClick={()=>navigate(`details`,{state:user})}>{user[1]["username"]}</td>
                  <td onClick={()=>navigate(`details`,{state:user})}>{user[1]["phone"]}</td>
                  <td onClick={()=>navigate(`details`,{state:user})}>{user[1]["gender"]}</td>
                  <td onClick={()=>navigate(`details`,{state:user})}>
                    <img src={user[1]["flag"]} alt=""/>
                  </td>
                  <td className="avatar" onClick={()=>navigate(`details`,{state:user})}>{user[1]["avatar"]}</td>
                  <td>
                    <img
                      className={`editavatar ${user[0]}`}
                      src={edit}
                      alt=""
                      onClick={(e)=> updateUser(e)}
                    />
                  </td>
                  <td>
                    <img
                      className={`trash ${user[0]}`}
                      src={trash}
                      alt=""
                      onClick={deleteavatar}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>}
      <ToastContainer />
    </div>
  );
}

export default Home;
