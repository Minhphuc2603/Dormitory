

import TemplateUser from "../template/TemplateUser";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BookingBed = () => {
    const id = sessionStorage.getItem('id')
    const [page, setPage] = useState(true)
    const [room, setRoom] = useState([])

    const [cost, setCost] = useState()
    const [user, setUser] = useState({})

    const [dom1, setDom1] = useState([])
    const [account, setAccount] = useState([])

    const [typeRoom, setTypeRoom] = useState([])
    const [doms, setDoms] = useState([])
    const [roomId, setRoomId] = useState([])
    const [check, setCheck] = useState([])
    const [freeBed, setFreeBed] = useState([])
    const [domID, setdomID] = useState([])
    sessionStorage.setItem('DomID' , domID)
    const next = () => {
        if (cost) {
            setPage(false)
        }
    }
    useEffect(() => {
      const role = sessionStorage.getItem('userrole');
      const id = sessionStorage.getItem('id');
      if (role == "admin" || id === null) {
        navigate("/error");
      }
    }, []);
    
    // const onSubmit1 = data => {
    //     setPage(true)
    //}
    const navigate = useNavigate()
    useEffect(() => {
        fetch('http://localhost:9999/account/' + id)
            .then(resp => resp.json())
            .then(data => {
                setAccount(data);
              
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);

    useEffect(() => {
        fetch('http://localhost:9999/user/' + id)
            .then(resp => resp.json())
            .then(data => {
                setUser(data);
                console.log(data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);

    useEffect(() => {
        fetch('http://localhost:9999/rooms')
            .then(resp => resp.json())
            .then(data => {
                setRoom(data);
               

            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);
    
    function updateCost(event) {

        //tra ve 1 index o select
        const selectedIndex = event.target.selectedIndex -1;
        //tra ve 1 mang dc chon
        
        const selectedOption = room[selectedIndex];
        

        const selectedCost = selectedOption.cost;
        const selectedTypeRoom = selectedOption.type_room;
        const selectedSlot = selectedOption.room_id
        setCost(selectedCost);
        setTypeRoom(selectedTypeRoom)
        setRoomId(selectedSlot)

    }




    useEffect(() => {
        fetch('http://localhost:9999/doms')
            .then(resp => resp.json())
            .then(data => {
                setDoms(data);

            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);
    
    useEffect(() => {
        const filteredDoms = doms.filter((dom) => dom.slot === roomId);
        setCheck(filteredDoms);

    }, [roomId, doms]);
    function updateBed(event) {

        //tra ve 1 index o select
        const selectedIndex = event.target.selectedIndex - 1;
        //tra ve 1 mang dc chon
        const selectedOption = check[selectedIndex];
        const selectedBed = selectedOption.freeBed;
        const selectedDomID = selectedOption.id
        setFreeBed(selectedBed)
        setdomID(selectedDomID)

    }


    useEffect(() => {
        fetch('http://localhost:9999/doms/' + domID)
            .then(resp => resp.json())
            .then(data => {
                setDom1(data);
                

            })
            .catch(err => {
                console.log(err.message);
            })
    }, [domID]);




    const updateDom = {
        domName: dom1.domName,
        domID: dom1.domID,
        slot: dom1.slot,
        totalBed: dom1.totalBed,
        usedBed: dom1.usedBed + 1,
        freeBed: dom1.freeBed - 1,
        id: domID
    }
    


    const updateUser = {
        id: user.id,

        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
        StudentID: user.StudentID,
        cost: (user.cost) - cost

    };
    const updateAccount = {
        id: account.id,
        username:account.username,
        password:account.password,       
        role:"user",
        status:account.status
    };
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const monthCheckout = month + 3; // Lưu ý: Tháng bắt đầu từ 0 (tháng 0 là tháng 1)
    const year = currentDate.getFullYear();
    
    const postResident = {
        StudentID: user.StudentID,
        Information: `${dom1.domID} - ${typeRoom}`,
        CheckOut: `${day}-${monthCheckout}-${year}`,
        Price: cost,
        CheckIn: `${day}-${month}-${year}`
    }
   
    
    const booking = () => {
        fetch(`http://localhost:9999/account/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateAccount)
        })
            .then((res) => res.json())
            .then((data) => {
            })
            .catch((err) => {
                toast.error('Failed to edit: ' + err.message);
            });
        fetch(`http://localhost:9999/residentHistory`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postResident)
        })
            .then((res) => res.json())
            .then((data) => {
            })
            .catch((err) => {
                toast.error('Failed to edit: ' + err.message);
            });
        fetch(`http://localhost:9999/user/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateUser)
        })
            .then((res) => res.json())
            .then((data) => {
            })
            .catch((err) => {
                toast.error('Failed to edit: ' + err.message);
            });
        fetch(`http://localhost:9999/doms/${domID}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateDom)
        })
            .then((res) => res.json())
            .then((data) => {
            })
            .catch((err) => {
                toast.error('Failed to edit: ' + err.message);
            });
        toast.success('Success');
        navigate("/resident")
    }
    return (
        <TemplateUser>
            {page ?
                <div className="">
                    <form className="flex flex-col gap-4">
                        <h1>Choose Type Room</h1>
                        <h4>Room type</h4>
                        <select id="room" style={{ width: "100%", height: '40px' }} onChange={updateCost}>




                            <option value="" disabled selected>
                                Null
                            </option>

                            {room.map(r => (

                                <option value={r.id} key={r.id} >{r.type_room}-{r.cost}</option>
                            ))}
                        </select>
                        <h4>Price/Bed/Semester</h4>
                        <input id="costInput" value={cost} disabled />
                        <button type="button"
                            className="bg-teal-400 rounded-lg w-24 h-10 flex justify-center items-center"
                            onClick={next}>Next</button>
                    </form>
                </div>
                :
                <div className="">
                    <h1>Detail Booking</h1>
                    <div className="flex  gap-4 grid-cols-2 justify-around flex-wrap row">
                        <div className='w-96 p-8 gap-1 grid col-6'>
                            <h4>Your Account Balance</h4>
                            <p>{user.cost} VND</p>
                            <h4>Minimum Balance required in VND</h4>
                            <p>{cost}</p>
                            <h4>Your Balance atter booking</h4>
                            <p>{(user.cost) - cost}</p>
                            <h4>Số slot còn lại</h4>
                            <p>{freeBed}</p>
                        </div>
                        <div className='w-96 col-6'>
                            <form >
                                <div className="grid grid-cols-2 gap-4">
                                    <Link to={"/listroom"} style={{
                                        background: "#ffffff",
                                        border: "1px solid #f36f21",
                                        borderRadius: 12,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "#f36f21",
                                        height: '50px'
                                    }} >
                                        See list room
                                    </Link>
                                    <div>Room Type<input disabled value={`${typeRoom}-${cost}`} /></div>
                                    <div>DOM</div>
                                    <select id="room" style={{ width: "100%", height: '40px' }} onChange={updateBed}>
                                        <option value="" disabled selected>
                                            Null
                                        </option>

                                        {check.map(c => (
                                            <option value={c.id} >{c.domID}</option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>

                    {!page && (
                        <div>
                            {account.role === "student" ? (
                                (user.cost - cost >= 0 && freeBed !== 0) ? (
                                    <button className="btn btn-success" onClick={booking}>
                                        booking
                                    </button>
                                ) : (
                                    <p style={{ color: "red" }}>
                                        Sorry, you don't have enough money or empty slots
                                    </p>
                                )
                            ) : (
                                <p style={{ color: "green" }}>
                                    Sorry, you already have a room
                                </p>
                            )}


                        </div>
                    )}
                </div>}

        </TemplateUser>



    );
}

export default BookingBed;