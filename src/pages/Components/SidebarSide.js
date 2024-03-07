import React, { useEffect, useState, useRef } from "react";
import { Sidebar } from "primereact/sidebar";
import { Badge } from "primereact/badge";
import { PanelMenu } from "primereact/panelmenu";
import { truncate } from "lodash";
import { Button } from "primereact/button";
import {
  FaBars,
  FaBell,
  FaBookmark,
  FaBorderAll,
  FaBorderNone,
  FaDragon,
  FaFire,
  FaHeart,
  FaHistory,
  FaHome,
  FaHubspot,
  FaInbox,
  FaNewspaper,
  FaParagraph,
  FaPlus,
  FaPlusSquare,
  FaRegSave,
  FaTable,
  FaVideo,

} from "react-icons/fa";
import { Link } from "gatsby";
import { Avatar } from "primereact/avatar";
import im from "../../images/proxy.jpeg";
import { useAuth } from "../../Accounts/useAuth";
import Wall from "../../images/Video-Wall.png";
import { TieredMenu } from "primereact/tieredmenu";
import { Tooltip } from "primereact/tooltip";
import { useLocation } from "@reach/router";
import { InputSwitch } from "primereact/inputswitch";
import { OverlayPanel } from 'primereact/overlaypanel';
import { navigate } from "gatsby";
const SidebarSide = ({
  loadVideos,
  Create,
  SlideDisable,
  setSlideDisable,
  visible,
  setVisible,
  setVid,
  vid,
  setLocalLike,
  localLike,
  setSwitch,
  setSwitchVids,
  Switch,
  SwitchVids,
  setWatchlist,
  Watchlist,
  SetshowSaved,
  showSaved,
  open
}) => {
  const location = useLocation();

  const menu = useRef(null);
  const menupages = useRef(null);
  const { signOut } = useAuth();

  const [strict, setStrict] = useState(true);

  const op = useRef(null);


  
  const highlightPage = useRef(false);
  const [active,setActive] = useState(false)
 
 function Created(){
  if (!location.pathname.startsWith("/Components/Wall/" )) {

    navigate("/Components/Wall/" );



 setActive(true)
}
      Create()

      
      }


useEffect(() =>{
  if (active && location.pathname.startsWith("/Components/Wall/" )) {
    Create()
    setActive(false)
  }
  
},[])


  switch (highlightPage.current) {
    case location.pathname.startsWith("Components/Wall/") && strict :
       highlightPage.current = 1;
       break;
   
    case location.pathname.startsWith("/") && strict :
      highlightPage.current = 2;
      
       break;
   
    case location.pathname.startsWith("@#@#@#") && strict :
       highlightPage.current = 2;
       break;
   
    case location.pathname.startsWith("**^&^&^") && strict :
       highlightPage.current = 3;
       break;
   
    case location.pathname.startsWith("}}{}{}}") && strict :
       highlightPage.current = 4;
       break;
   
    default:
       highlightPage.current = 19;
   }
 
const [Theme, setTheme] = useState(false)
const [ToggleMode, setToggleMode] = useState(false)
  const [checked, setChecked] = useState(false);


  const ToggleLight = (e) =>{

    setChecked(e)

   // setToggleMode(false)
  setTheme(!Theme)
  }


  



function Toggleit(e){
 menu.current.toggle(e)
}







let items ;



ToggleMode ?

items =
[
Theme ?

  {
    label: "Switch",
    icon:"pi pi- pi-sun" ,

    command: () => {
      setToggleMode(false)
      setTheme(true)

    alert(Theme)
    },

  }
  :
  {
    label: "Switch",
    icon:"pi pi- pi-moon" ,

    command: (e) => {

      setToggleMode(false)
      setTheme(false)      

    },

  }



    ]
:

items =
  
  [
    {
      label: "settup",
      icon: Spin ? "pi pi-spin pi-cog" : "pi  pi-cog",

      command: () => {
        Spin = true;

      },

      items: [
        {
          label: "Settings",
          icon: "pi  pi-cog pi-align-left",
          severity: "warning",
          command: () => {
            alert("Settings");


          window.location.href =  '/Settings/ProfileSettup/'
          },
        },
        {
          label: "About",
          icon: "pi pi-info-circle",
          command: () => {
            alert("About");
          },
        },
        {
          label: "privacy",
          icon: "pi  pi-shield",
          command: () => {
            alert("privacy");
          },
        },
        {
          label: "terms",
          icon: "pi pi-file",
          command: () => {
            alert("terms");        
          },
        },

        {
          label: "contacts",
          icon: "pi pi-book",
          command: () => {
            alert("Contacts");
          },
        },
      ],
    },
    Theme ?
    {
      label:  "ToggleMode",
      icon: checked &&  "pi pi-moon",

      command: (e) => {
        setToggleMode(true)
      
   
      },
    }
    :
    {
      label:  "ToggleMode",
      icon: !checked &&  "pi pi-sun",

      command: () => {
setToggleMode(true)


      },
    },
    {
      label: "Logout",
      icon: "pi pi-sign-out",

      command: () => {
        signOut();

      },
    },
  ];

  const pages = [
    {
      label: "News",
      icon: "pi pi-book",

      command: () => {
        Spin = true;
      },

      items: [
        {
          label: "n",
          icon: "",
          severity: "warning",
          command: () => {
            alert("Settings");
          },
        },

        {
          label: "News",
          icon: "pi  pi-book pi-align-left",

          command: () => {
            alert("Settings");
          },
        },
        {
          label: "Trending",
          icon: "pi pi-",
          command: () => {
            alert("About");
          },
        },
        {
          label: "Politics",
          icon: "pi ",
          command: () => {
            alert("privacy");
          },
        },
        {
          label: "Sports",
          icon: "pi pi-",
          command: () => {
            alert("terms");
          },
        },

        {
          label: "Fashion",
          icon: "pi pi-",
          command: () => {
            alert("Contacts");
          },
        },

        {
          label: "Celebrity",
          icon: "pi ",
          command: () => {
            alert("Contacts");
          },
        },
      ],
    },
  ];

  const toggleSidebar = () => {
    setVisible(!visible);
  };

  const [visibleLow, setvisibleLow] = useState(true);

  
useEffect(() =>{
  if(window.innerWidth <= 1000 ){
    setvisibleLow(false)
  }
}, [])


  const type = typeof window !== "undefined";

  function HomeMode() {
    vid && setVid(null);
    SwitchVids && setSwitchVids(null);
    Watchlist && setWatchlist(null);
    showSaved && SetshowSaved(null);
    localLike && setLocalLike(null);
    Switch && setSwitch(null);
    setSlideDisable(false);

    const local1 =
      typeof window !== "undefined" ? sessionStorage.getItem("switched") : [];
    const local2 =
      typeof window !== "undefined"
        ? sessionStorage.getItem("switchedVid")
        : [];
    const local3 =
      typeof window !== "undefined" ? sessionStorage.getItem("LocalLikes") : [];
    const local4 =
      typeof window !== "undefined" ? sessionStorage.getItem("WatchList") : [];
    const local5 =
      typeof window !== "undefined" ? sessionStorage.getItem("SavedVids") : [];

    if (local1 !== null) {
      sessionStorage.removeItem("switched");
    } else if (local2 !== null) {
      sessionStorage.removeItem("switchedVid");
    } else if (local3 !== null) {
      sessionStorage.removeItem("LocalLikes");
    } else if (local4 !== null) {
      sessionStorage.removeItem("WatchList");
    } else if (local5 !== null) {
      sessionStorage.removeItem("SavedVids");
    }
  }

  function SetLocal() {
    setStrict(false);
    setVisible(true);
    sessionStorage.clear();
    vid && setVid(null);
    SwitchVids && setSwitchVids(null);
    Watchlist && setWatchlist(null);

    showSaved && SetshowSaved(null);
    setLocalLike && setLocalLike(null);
    const loca = sessionStorage.setItem("switched", true);

    const local =
      typeof window !== "undefined" ? sessionStorage.getItem("switched") : [];
    setSwitch(local);
    setSlideDisable(false);

  highlightPage.current= false
  }

  function SetLocalMine() {
    setStrict(false);
    setSlideDisable(false);
    sessionStorage.clear();
    vid && setVid(null);
    Switch && setSwitch(null);
    localLike && setLocalLike(null);
    Watchlist && setWatchlist(null);
    showSaved && SetshowSaved(null);

    const loca = sessionStorage.setItem("switchedVid", true);

    const local =
      typeof window !== "undefined"
        ? sessionStorage.getItem("switchedVid")
        : [];
    local && setSwitchVids(local);
    //  loadVideos()
    setTimeout(() => {
      loadVideos();
    }, 1000);

    highlightPage.current = false
  }

  function ToggleLikes() {
    setStrict(false);
    setSlideDisable(false);
    sessionStorage.clear();
    vid && setVid(null);
    Switch && setSwitch(null);
    SwitchVids && setSwitchVids(null);
    Watchlist && setWatchlist(null);
    showSaved && SetshowSaved(null);
    const loca = sessionStorage.setItem("LocalLikes", true);

    const local =
      typeof window !== "undefined" ? sessionStorage.getItem("LocalLikes") : [];
    local && setLocalLike(local);
    setTimeout(() => {
      loadVideos();
    }, 1000);

    highlightPage.current = false
  }

  function ToggleWatchList() {
    setStrict(false);
    setSlideDisable(false);
    setVisible(true);

    sessionStorage.clear();
    // setVisible(false);
    vid && setVid(null);
    Switch && setSwitch(null);
    SwitchVids && setSwitchVids(null);
    localLike && setLocalLike(null);
    showSaved && SetshowSaved(null);
    const loca = sessionStorage.setItem("WatchList", true);

    const local =
      typeof window !== "undefined" ? sessionStorage.getItem("WatchList") : [];

    highlightPage.current = false;

  }

  function ToggleSaved() {
    setStrict(false);
    setSlideDisable(false);

    sessionStorage.clear();
    vid && setVid(null);
    Switch && setSwitch(null);
    SwitchVids && setSwitchVids(null);
    localLike && setLocalLike(null);
    Watchlist && setWatchlist(null);
    const loca = sessionStorage.setItem("SavedVids", true);

    const local =
      typeof window !== "undefined" ? sessionStorage.getItem("SavedVids") : [];
    local && SetshowSaved(local);

    setTimeout(() => {
      loadVideos();
    }, 3000);
    highlightPage.current = false;

  }

  const [Saved, setSaved] = useState(
    type ? sessionStorage.getItem("SavedVids") : []
  );
  const [Likes, setLikes] = useState(
    type ? sessionStorage.getItem("LocalLikes") : []
  );
  const [watch, setWatch] = useState(
    type ? sessionStorage.getItem("WatchList") : []
  );
  const [Mine, setMine] = useState(
    type ? sessionStorage.getItem("switchedVid") : []
  );
  const [Local, setLocal] = useState(
    type ? sessionStorage.getItem("switched") : []
  );

  useEffect(() => {
    // Define your state update functions (e.g., ToggleSaved, ToggleWatchList, etc.)

    if (Saved) {
      ToggleSaved();
    }

    if (watch) {
      ToggleWatchList();
    }

    if (Likes) {
      ToggleLikes();
    }

    if (Mine) {
      SetLocalMine();
    }

    if (Local) {
      SetLocal();
    }
  }, []);

  return (
    <div
      className="leftsm"
      style={{
      
    
        height: "100vh",
        width: visible ? "5%" : "20%",
        float: "left",

        position: visibleLow && "relative",

        
      }}
    >
      <div
        className="zindexpanel pside"
        style={{
          position: "relative",
          width: visible ? "50px" : "280px",
          zIndex: "100",
        }}
      >
        <div
          className="darkbg "
          style={{
            background: "transparent",
            height: "45px",
            width: "100%",
            position: "relative",
          }}
        >
          <div
            className="d-flex animated-log flex-row ps-3 pl-1 pt-1   fixedit"
            id="logow"
            style={{
              position: "absolute",
              left: "50px",
              height: "45px",
              top: "0",
              width: "fit-content",
              margin: "auto",
              background: visible ? "black" : "transparent",
            }}
          >
          <Link style={{display:"flex", flexDirection:"row", textDecoration:"none"}} to="/">
              <FaDragon
              className="dragon"
              icon=" fa-3x me-3 "
              style={{ fontSize: "1rem", color: "orange", divor: "#709085" }}
            />
            <span
              className="blabzio h1 fw-bold mb-0"
              style={{
                textShadow: " 1px 1px black",
                color: "whitesmoke",
                fontSize: "1.4rem",
              }}
            >
              <b style={{ color: "orange" }} className="letter-b">
                B
              </b>
              lab<b style={{ color: "orange", fontFamily: "sans-serif" }}>Z</b>
              io{" "}
            </span>
            
              </Link>
          
          </div>

          {visible ? (
            <Button
              icon="pi  pi-arrow-right"
              className="dnoneit"
              style={{
                borderRadius: "0",
                float: "right",
                MarginTop: "auto",
                position: "absolute",
                top: "0",
                right: "0",
                background: " #0a0a0a",
                border: "1px solid #efae12",
              }}
              onClick={toggleSidebar}
            />
          ) : (
            <Button
              className="dnoneit"
              icon="pi  pi-arrow-left"
              style={{
                borderTopRightRadius: "0",
                borderBottomRightRadius: "0",
                float: "right",
                MarginTop: "auto",
                position: "absolute",
                top: "0",
                right: "0",
                background: "#0a0a0a",
                border: "1px solid #efae12",
              }}
              onClick={toggleSidebar}
            />
          )}
        </div>

        <div className="containerpad" style={{ padding: "16px" }}>
          <ul
            className="ulrowed "
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "30px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                className="flex-a rightend"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
              >
                <Avatar
                  image={im}
                  className={`p-overlay-badge rightendimg  m-auto rowedimg  sizesm mtoppx   AvatarVisible`}
                  shape="circle"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: " margin-top: -100px;",
                    width: visible ? "" : "40%",
                    position: "abolute",
                    top: "45px",
                    left: "-10px",
                    right: "0",
                    margin: visible && "auto",
                    height: visible ? "60px" : "100px",
                  }}
                  icon="pi pi-user"
                  size="small"
                >
                  <Badge
                    style={{
                      transform: "translate(5%, -10%)",
                      height: visible ? "0.8rem" : "1rem",
                      minWidth: visible ? "0.5rem" : "1rem",
                      lineHeight: "1rem",
                    }}
                    value="4"
                    severity="warning"
                  />

                  <h5
                    className="mineSmall"
                    style={{ fontSize: visible && "10px ", fontWeight: "bold" }}
                  >
                    Hoddu
                  </h5>
                </Avatar>
              </div>
            </div>

            <ul
              className="rowe"
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: visible ? "100px" : "60px",
              }}
            >
              <Link
                onClick={HomeMode}
                className={`drawr drawer1 ${visible && "sethide"}`}
                style={{
                  color: highlightPage.current === 2 ? "orange" : "black",
                  marginBottom: visible && "25px",
                }}
                to="/"
              >
                {" "}
                <FaHome
                  style={{
                    float: visible && "left",
                    position: visible && "absolute",
                    left: visible && "15px",
                  }}
                />{" "}
                {visible ? " " : visibleLow && "Home"}{" "}
              </Link>

              <div
                className="card DrawerOnlySmall flex bgsm justify-content-center "
                style={{ height: "fit-content" }}
              >
                <TieredMenu
                  className="DrawerOnlySmall "
                  model={pages}
                  popup
                  ref={menupages}
                  breakpoint="767px"
                />

                <button
                  onClick={(e) => menupages.current.toggle(e)}
                  className="drawr drawer8  DrawerOnlySmall"
                  style={{
                    color: localLike ? "orange" : "black",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    marginBottom: visible && "25px",
                  }}
                >
                  <FaBars
                    style={{
                      float: visible && "left",
                      position: visible && "absolute",
                      left: visible && "-3px",
                      fontWeight: "bold",
                    }}
                  />{" "}
                  {visible ? " " : visibleLow && "More"}
                </button>
              </div>

              <Link
                data-pr-tooltip="News"
                onClick={HomeMode}
                className="drawr drawer3 "
                style={{ marginBottom: visible && "25px" }}
                to="/news"
              >
                <FaNewspaper
                  style={{
                    float: visible && "left",
                    position: visible && "absolute",
                    left: visible && "15px",
                  }}
                />{" "}
                {visible ? " " : visibleLow && "News"}
              </Link>

              <button
                data-pr-tooltip="Create"
                onClick={Created}
                className="drawr drawer2"
                style={{
                  color: localLike ? "orange" : "black",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  marginBottom: visible && "25px",
                  borderRadius: "5px",
                }}
              >
                <FaBorderAll
                  style={{
                    float: visible && "left",
                    position: visible && "absolute",
                    left: visible && "15px",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    color: "black",
                    
                     background:" linear-gradient(211deg, #c17507, transparent)"
                  }}
                />{" "}
                {visible ? " " : visibleLow && "Create"}
              </button>
              <Tooltip target=".drawer2" />

              <Link
                data-pr-tooltip="Wall"
                onClick={HomeMode}
                className="drawr drawer3 "
                style={{
                  marginBottom: visible && "25px",
                  color: highlightPage.current === 1 ? "orange" : "black",
                }}
                to="/Components/Wall"
              >
                <img
                  src={Wall}
                  style={{
                    backgroundBlendMode: "inherit",
                    float: visible && "left",
                    position: visible && "absolute",
                    left: visible && "15px",
                    width: "30px",
    padding: "5px",
    marginLeft:"-5px",
                    background:
                      highlightPage.current === 1
                        ? "orange"
                        : "transparent",
                  }}
                />
                {visible ? " " : visibleLow && "Wall"}
              </Link>
              {/* <Link className='drawr' style={{marginBottom: visible && "25px"}}  to="/"> <FaFire style={{ float: visible &&  "left", position: visible && "absolute",  left: visible &&"5px"}} />  {visible ? " " :"Trending"}</Link> */}

              <Tooltip target=".drawer3" />

              <Link
                onClick={HomeMode}
                className="drawr drawer4"
                style={{ marginBottom: visible && "25px" , color:  highlightPage.current === 0 ? "orange" : "black" }}
                to="/news/Messages"
              >
                <FaInbox
                  style={{
                    float: visible && "left",
                    position: visible && "absolute",
                    left: visible && "15px",
                  }}
                />{" "}
                {visible ? " " : visibleLow && "Messages"}
              </Link>

              <Link
                onClick={HomeMode}
                className="drawr drawer5 dnoneBtn"
                style={{ marginBottom: visible && "25px" }}
                to="/news/Posted/Posts"
              >
                <FaBell
                  className="dnoneBtn"
                  style={{
                    float: visible && "left",
                    position: visible && "absolute",
                    left: visible && "15px",
                  }}
                />{" "}
                {visible ? " " : visibleLow && "Notifications"}
              </Link>

              <button
                data-pr-tooltip="WatchList"
                tooltipOptions={{
                  position: visibleLow ? "top" : "bottom",
                  mouseTrack: true,
                  mouseTrackTop: 15,
                }}
                onClick={ToggleWatchList}
                className="drawr drawer6 dnoneBtn"
                style={{
                  color: Watchlist ? "orange" : "black",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  marginBottom: visible && "25px",
                }}
                to="/"
              >
                {" "}
                <FaBookmark
                  className="dnoneBtn"
                  style={{
                    float: visible && "left",
                    position: visible && "absolute",
                    left: visible && "15px",
                  }}
                />{" "}
                {visible ? " " : visibleLow && "WatchList"}
              </button>
              <Tooltip target=".drawer6" />

              <button
                data-pr-tooltip="TimeLine"
                tooltipOptions={{
                  position: visibleLow ? "top" : "bottom",
                  mouseTrack: true,
                  mouseTrackTop: 15,
                }}
                className="drawr drawer7 dnoneBtn"
                style={{
                  color: Switch ? "orange" : "black",
                  background: "none",
                  border: "none",
                  marginBottom: visible && "25px",
                }}
                onClick={SetLocal}
                to="/news/TheWall/TimeLine"
              >
                {" "}
                <FaHistory
                  className="dnoneBtn"
                  style={{
                    float: visible && "left",
                    position: visible && "absolute",
                    left: visible && "15px",
                  }}
                />{" "}
                {visible ? " " : visibleLow && "TimeLine"}
              </button>
              <Tooltip target=".drawer7" />

              <button
                data-pr-tooltip="MyVideos"
                tooltipOptions={{
                  position: visibleLow ? "top" : "bottom",
                  mouseTrack: true,
                  mouseTrackTop: 15,
                }}
                className={`drawr drawer8 dnoneBtn`}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: SwitchVids ? "orange" : "black",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  marginBottom: visible && "25px",
                }}
                onClick={SetLocalMine}
              >
                <FaVideo
                  className="dnoneBtn"
                  style={{
                    float: visible && "left",
                    position: visible && "absolute",
                    left: visible && "15px",
                  }}
                />{" "}
                {visible ? " " : visibleLow && " MyVideos"}
              </button>

              <Tooltip target=".drawer8" />

              <button
                data-pr-tooltip="Saved"
                tooltipOptions={{
                  position: visibleLow ? "top": "bottom",
                  mouseTrack: true,
                  mouseTrackTop: 15,
                }}
                onClick={ToggleSaved}
                className="drawr drawer9 dnoneBtn"
                style={{
                  color: showSaved ? "orange" : "black",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  marginBottom: visible && "25px",
                }}
                to="/"
              >
                <FaRegSave
                  className="dnoneBtn"
                  style={{
                    float: visible && "left",
                    position: visible && "absolute",
                    left: visible && "15px",
                  }}
                />{" "}
                {visible ? " " : visibleLow && "Saved"}
              </button>
              <Tooltip target=".drawer9" />

              <button
                data-pr-tooltip="Likes"
                tooltipOptions={{
                  position: visibleLow ? "top" : "bottom",
                  mouseTrack: true,
                  mouseTrackTop: 15,
                }}
                onClick={ToggleLikes}
                className="drawr drawer10 dnoneBtn"
                style={{
                  color: localLike ? "orange" : "black",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  marginBottom: visible && "25px",
                }}
              >
                <FaHeart
                  className="dnoneBtn"
                  style={{
                    float: visible && "left",
                    position: visible && "absolute",
                    left: visible && "15px",
                  }}
                />{" "}
                {visible ? " " : visibleLow && "Liked"}
              </button>
              <Tooltip target=".drawer10" />
            </ul>
          </ul>

          <div
            className="card flex justify-content-center  mineBig"
            style={{ height: "fit-content" }}
          >



           { ToggleMode ?




<div > 
<div className="card flex justify-content-center " style={{position:"fixed", bottom : "50px", left:"100px", background:"white", boxShadow:"1px 1px 3px rgba(0,0,0.72)",zIndex:"40"  }} >
 <button   onClick={() => setToggleMode(false) } style={{width:"fit-content", float:"left", color:"black", border:"none", padding:"10px"}}>
  <i className="pi pi-chevron-left" style={{ fontSize: '1rem'}}            
></i>
  </button> 
    <div style={{display:"inline-block"}}>
    <span><b style={{marginRight:"10px", marginLeft:"10px"}}>Mode </b>   {checked ?  <i className="pi pi-moon" style={{ fontSize: '1rem', marginTop:"10px", textShadow:"1px 1px 0.55px yellow" }}></i> :  <i className="pi pi-sun" style={{ fontSize: '1rem', marginTop:"10px", textShadow:"1px 1px 0.55px black",  color:"yellow" }}></i>  }
 </span>

        </div>
         
        <hr></hr>

        <div style={{display:"inline-block", padding:"10px"}}>
       <span>Switch</span>      <InputSwitch style={{paddingTop:"10px"}} checked={checked} onChange={(e) => ToggleLight(e.value)} />
       </div>

         </div>

</div>
           

            :

            
            <TieredMenu
              className="mineBig"
              model={items}
              popup 
              ref={menu}
              breakpoint="767px"
            />
                    
           }

            <button
              onClick={(e) => Toggleit(e) }
              className="drawr drawer11  mineBig"
              style={{
                color: localLike ? "orange" : "black",
                background: "none",
                border: "none",
                cursor: "pointer",
                marginBottom: visible && "25px",
              }}
            >
              <FaBars
                style={{
                  float: visible && "left",
                  position: visible && "absolute",
                  left: visible && "-3px",
                  fontWeight: "bold",
                }}
              />{" "}
              {visible ? " " : visibleLow && "More"}
            </button>
          </div>
        </div>

        {!visible && (
          <Link className="footerlink hov5 mineSmall" to="/">
            {" "}
            &copy; Blabzio 2022 - {new Date().getFullYear()}{" "}
          </Link>
        )}
      </div>
    </div>
  );
};

let Spin = false;

{
  /*

    <Link  onClick={HomeMode} className='drawr drawer2 dnoneBtn' style={{marginBottom: visible && "25px"}}  to="/news/Posted/Posts"><FaBell className='dnoneBtn' style={{ float: visible &&  "left", position: visible && "absolute",  left: visible &&"15px"}}/>  {visible ? " " : visibleLow && "Notifications"}</Link>


                <button 
onClick={ToggleWatchList} className='drawr drawer3 dnoneBtn' style={{ color: Watchlist ? "orange" : "black" ,background:"none",border:"none",cursor:"pointer", marginBottom: visible && "25px"}}  to="/"> <FaBookmark className='dnoneBtn' style={{ float: visible &&  "left", position: visible && "absolute",  left: visible &&"15px"}}/> {visible  ? " " : visibleLow && "WatchList"}</button>
 

 <button className='drawr drawer4 dnoneBtn' style={{color:Switch ? "orange" : "black", background:"none",border:"none",marginBottom: visible && "25px"}} onClick={SetLocal} to="/news/TheWall/TimeLine"> <FaHistory className='dnoneBtn' style={{ float: visible &&  "left", position: visible && "absolute",  left: visible &&"15px"}} /> {visible ? " " :  visibleLow && "TimeLine"}</button>
 
 <button className={`drawr drawer5 dnoneBtn`} style={{background:"none",border:"none",cursor:"pointer", color: SwitchVids ? "orange" :"black",background:"none",border:"none",cursor:"pointer", marginBottom: visible && "25px"}} onClick={SetLocalMine}    ><FaVideo className='dnoneBtn' style={{ float: visible &&  "left", position: visible && "absolute",  left: visible &&"15px"}} />  {visible ? " " : visibleLow && " Your Videos"}</button>

 <button onClick={ToggleSaved} className='drawr drawer6 dnoneBtn' style={{color: showSaved ? "orange" : "black", background:"none",border:"none",cursor:"pointer", marginBottom: visible && "25px"}}  to="/"><FaRegSave  className='dnoneBtn' style={{ float: visible &&  "left", position: visible && "absolute",  left: visible &&"15px"}}/>  {visible ? " " : visibleLow && "Saved"}</button>
 <button onClick={ToggleLikes} className='drawr drawer7 dnoneBtn' style={{ color: localLike ? "orange" : "black", background:"none",border:"none",cursor:"pointer", marginBottom: visible && "25px"}}  ><FaHeart className='dnoneBtn' style={{ float: visible &&  "left", position: visible && "absolute",  left: visible &&"15px"}}/>  {visible ? " " :  visibleLow && "Liked"}</button>
               


  */
}

export default SidebarSide;
 