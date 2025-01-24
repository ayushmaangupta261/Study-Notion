import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import Logo from "../../assets/StudyNotion.svg";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { Location } from "react-router-dom";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { categories } from "../../services/api";
import { apiConnector } from "../../services/apiconnector";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";

import { logout } from "../../services/operations/authAPI";
import { setProfileLoading } from "../../slices/profileSlice";

import { fetchCourseCategories } from "../../services/operations/courseDetailsAPI";

// const subLinks = [
//   {
//     title: "python",
//     link: "/catalog/python",
//   },
//   {
//     title: "web dev",
//     link: "/catalog/web-development",
//   },
// ];

const Navbar = () => {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { token } = useSelector((state) => state.auth);

  // const fetchSublinks = async () => {
  //   try {
  //     const result = await apiConnector("GET", categories.CATEGORIES_API);
  //     console.log("printing sublinks result -> ", result);
  //     setSubLinks(result);
  //   } catch (e) {
  //     console.log("Unable to fetch categories...");
  //     console.log(e);
  //   }
  // };



  useEffect(() => {

    const apiRes = async () => {
      setProfileLoading(true);
      try {
        // const res = await apiConnector("GET", categories.CATEGORIES_API);
        const res = await fetchCourseCategories();
        // console.log("catalog api res -> ", res)
        setSubLinks(res);
      } catch (e) {
        console.log("Could not fetch categories -> ", e);
      }
      setProfileLoading(false);
    }

    apiRes();

  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
    // location.reload
  };

  return (
    <div className="flex h-auto md:h-14 items-center justify-center border-b-[1px] border-richblack-700 pb-[1rem] md:p-1 mt-1">
      <div className="flex flex-col md:flex-row w-11/12 max-w-maxContent gap-y-2 items-center justify-between">
        {/* Logo of study notion */}
        <Link to="/">
          <img src={Logo} width={160} height={32} loading="lazy" />
        </Link>

        {/* Navbars Link */}
        <nav>
          <ul className="flex gap-x-[2rem] text-richblack-25 text-[0.9rem] md:text-[1rem]">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className=" relative flex gap-x-2 items-center group z-10">
                    <p>{link.title}</p>

                    <IoIosArrowDropdownCircle />

                    <div className="invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[30%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[300px] ">

                      <div className="absolute translate-x-[82%] translate-y-[-45%] left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-5"></div>
                      {
                        //  profileLoading ? (
                        //     <p className="text-center">Loading...</p>
                        //   ) : (
                        //   subLinks.length ? (
                        //   <>
                        //     {
                        //       subLinks?.filter(
                        //         (subLink) => subLink?.courses?.length > 0
                        //       )?.map((subLink, i) => {
                        //         <Link
                        //           to={`/catalog/${subLink.name.split(" ").join("-").toLoweCase()}`}
                        //           className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-5"
                        //           key={i}
                        //         >
                        //           <p className="text-black">{subLink.name}</p>
                        //         </Link>
                        //       })
                        //     }
                        //   </>
                        // ) : (<div></div>)
                        // )

                        //------------------------
                      
                       <div className="">
                         {
                          token != null && 
                          (
                            subLinks.map((subLink, i) => (
                              <Link to={`/catalog/${subLink.name.toString().split(" ").join("-").toLowerCase()}`} >
                                <p className="text-center  ">{subLink.name}</p>
                              </Link>
                            )
    
                            )
                          )
                        }
                        {
                          token == null && (
                          <Link to={"/login"}>
                            <div className="text-center">Please LogIn</div>
                          </Link>
                          )
                        }
                       </div>

                      }
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${matchRoute(link?.path)
                        ? "text-yellow-25"
                        : "text-richblack-25"
                        }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login signup and dashboard */}
        <div className="flex md:flex-row flex-row-reverse gap-x-[2rem] items-center text-richblack-5 ">
          {user && user?.accountType != "Instructor" && (
            <Link to={"/dashboard/cart"} className="relative ">
              <AiOutlineShoppingCart className=""/>
              {totalItems > 0 && <span className="absolute -right-[1rem] -top-[1rem] bg-caribbeangreen-100 px-2 text-center animate-bounce text-black rounded-full">{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Sign Up
              </button>
            </Link>
          )}
          {/* {
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Sign Up
              </button>
            </Link>
          } */}
          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Log In
              </button>
            </Link>
          )}
          {/* {
            <Link to="/login">
              <button className="border borderz-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Log In
              </button>
            </Link>
        } */}
          {token !== null &&
            <button onClick={() => dispatch(logout(navigate))} className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
              Log Out
            </button>
          }

          {token !== null && <ProfileDropDown />}


        </div>
      </div>
    </div>
  );
};

export default Navbar;
