import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import userService from "./components/services/user.service";
import authService from "./components/services/auth.service";
import Cart from "./components/admin/users/cart.component";
import { useDispatch, useSelector } from "react-redux";
import G from "../src/assets/G.png";

const Nav = ({ history, user, amountNoti, notify, amountCart }) => {
  const listProducts = useSelector((state) => state.getProducts);
  console.log(listProducts);

  const { products, loading, error } = listProducts;
  console.log(products);

  let Links = [
    { name: "Thông báo", link: "/" },
    { name: "Giỏ hàng", link: "/" },
  ];
  let [showCart, setShowCart] = useState(false);
  let [onUser, setOnUser] = useState(false);
  let [open, setOpen] = useState(false);
  let [onNotify, setOnNotify] = useState(false);
  const [read, setRead] = useState([]);
  const checkedStatus = async (id) => {
    await userService.notiIsRead(id);
    const l = amountNoti - 1;

    console.log(amountNoti);
    setRead(read.concat(id));
    console.log(read);
  };

  const getOrder = (id) => {
    console.log("get");
    userService
      .checkedOrderStatus(user._id, id)
      .then((response, i) => {})
      .catch((err) => {
        console.log(err);
      });
    history.push("/user-view/order-${id}");
  };
  const [isInput, setIsInput] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-40">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <input
          className={`${
            isInput === 1 ? "" : "hidden"
          }  ml-6 mt-2 ring-1 rounded text-sm text-center ring-1 ring-black ring-opacity-40 font-[Poppins] `}
          type="text"
          placeholder="nhập tên cần tìm.."
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
        />
        <div className="w-40">
          <svg
            onClick={() => setIsInput(1)}
            xmlns="http://www.w3.org/2000/svg"
            className={` h-7 w-7 stroke-current stroke-2 ${
              isInput === 1 ? "hidden" : ""
            } `}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div
          className={`absolute w-1/4 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20 left-0 ${
            searchInput ? "top-14 opacity-100 bg-black" : "top-[-490px]"
          }`}
        >
          {products &&
            searchInput &&
            products
              .filter((val) => {
                if (searchInput === "") {
                  return val;
                }
                if (
                  val.name.toLowerCase().includes(searchInput.toLowerCase())
                ) {
                  return val;
                  console.log(val);
                }
              })
              .map((val) => {
                return (
                  <div className="incol w-full hover:bg-gray-100 bg-white">
                    <a
                      onClick={(e) =>
                        (window.location.href = "/user-view/item-" + val._id)
                      }
                      class={` w-full flex items-center px-4 py-3 border-b  -mx-2`}
                    >
                      <img
                        class="h-8 w-8 rounded-full object-cover mx-1"
                        src={`./assets/imgs/products/${val.thumbnail}`}
                        alt="avatar"
                      />
                      <span className="font-[Poppins] ">{val.name}</span>
                    </a>
                  </div>
                );
              })}
        </div>

        <div className="mr-3 font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
          <span className="text-3xl text-indigo-600 mr-1 pt-2">
            <ion-icon name="logo-ionic"></ion-icon>
          </span>
          <img className="" src={G} />
        </div>

        <div className="inrow space-x-7">
          <div
            className="hidden md:block"
            onClick={() => {
              setShowCart(!showCart);
            }}
          >
            <div className="inrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="text-bold text-blue-500">{amountCart}</span>
            </div>
            <div>{!showCart ? "" : <Cart />}</div>
          </div>
          <div className="hidden md:block">
            <svg
              onClick={() => setOnNotify(!onNotify)}
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-8 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="text-bold text-blue-500">
              {amountNoti > 0 && amountNoti}
            </span>
          </div>
          <div
            onClick={() => setOnUser(!onUser)}
            className="group relative z-10 hidden md:block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div
              className={`usericon-menu top-0 absolute ${
                onUser === true ? "" : "hidden"
              }  w-44 rounded-md shadow-lg top-10 right-0 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none`}
            >
              <ul class="block w-full bg-white shadowdivide-y divide-gray-100">
                {user ? (
                  <div className="z-40">
                    <li
                      onClick={(e) =>
                        (window.location.href = "/user-view/user-" + user.id)
                      }
                      class="py-1"
                    >
                      <a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">
                        Xem thông tin
                      </a>
                    </li>
                    <li
                      onClick={() => {
                        authService.logout();
                      }}
                      class="py-1"
                    >
                      <a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">
                        Đăng xuất
                      </a>
                    </li>
                  </div>
                ) : (
                  <div>
                    <li
                      onClick={(e) => (window.location.href = "/login")}
                      class="py-1"
                    >
                      <a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">
                        Đăng Nhập
                      </a>
                    </li>
                    <li
                      onClick={(e) => (window.location.href = "/register")}
                      class="py-1"
                    >
                      <a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">
                        Đăng ký
                      </a>
                    </li>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {/* <ion-icon name={open ? 'close':'menu'}></ion-icon> */}
          {!open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          )}
        </div>

        <div
          class={`absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20 right-12 top-11 ${
            open ? "top-20 opacity-100" : "top-[-490px]"
          }`}
        >
          {!onNotify ? (
            ""
          ) : notify.length > 0 ? (
            notify.map((o) => (
              <div
                className={`incol ${
                  !o.isRead && !read.includes(o._id)
                    ? "bg-gray-200"
                    : "bg-white"
                }`}
              >
                <a
                  onClick={() => {
                    checkedStatus(o._id);
                  }}
                  class={` w-full flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2`}
                >
                  <img
                    class="h-8 w-8 rounded-full object-cover mx-1"
                    src={`./assets/imgs/products/${o.order.orderItems[0].thumbnail}`}
                    alt="avatar"
                  />
                  <p class="text-gray-600 text-sm mx-2 incol">
                    {o.type === 1 ? (
                      <span class="font-bold" href="#">
                        Đơn hàng #
                        <span className="text-indigo-500">{o.orderid}</span>{" "}
                        {o.content}
                      </span>
                    ) : (
                      <span class="font-bold" href="#">
                        {o.content}
                      </span>
                    )}
                    <span
                      class="ml-1 font-bold text-blue-500"
                      onClick={() => {
                        getOrder(o.orderid);
                      }}
                    >
                      {" "}
                      Xem
                    </span>
                  </p>
                  <div className="flex justify-end">
                    <Moment className="text-sm flex justify-end" fromNow>
                      {o.createdAt}
                    </Moment>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <div className="px-4 py-2">
              <span className="text-sm">Hiện không có thông báo nào.</span>
            </div>
          )}
        </div>

        <ul
          className={`md:hidden md:flex md:items-center md:pb-0 pb-12  pl-3 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-19 opacity-100" : "top-[-490px]"
          } md:opacity-100 opacity-0`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <a
                href={link.link}
                className="text-gray-800 text-md hover:text-gray-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
          {user ? (
            <a
              href={"/user-view/user-" + user.id}
              className="text-gray-800 hover:text-gray-400 text-xl duration-500"
            >
              Xem thông tin
            </a>
          ) : (
            <a
              href="/login"
              className="text-gray-800 hover:text-gray-400 duration-500 text-md"
            >
              Đăng nhập
            </a>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
