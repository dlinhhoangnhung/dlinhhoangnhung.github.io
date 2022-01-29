<div className="absolute bg-white inrow w-full pl-10 pr-12 pt-3 h-14">
{/* Search */}
<div className="w-44">
    <input
        className={`${isInput === 1 ? '' : 'hidden'} w-full ml-6 mt-2 ring-1 rounded text-sm text-center font-serif ring-1 ring-black ring-opacity-40`}
        type="text"
        placeholder="nhập tên cần tìm.."
        onChange={event => { catchInputSearch(event.target.value) }}
    />
    <svg onClick={() => setIsInput(1)} xmlns="http://www.w3.org/2000/svg" className={` h-7 w-7 stroke-current stroke-2 ${isInput === 1 ? 'hidden' : ''} `} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
</div>

<div onClick={() => setIsInput(0)} className="w-full">
    <div className="flex justify-center">
        {/* Logo */}
        <img className="mr-28 absolute w-6 h-8" src={G} />
    </div>
    <div className=" flex justify-end space-x-8">
        {/* Right Side */}

        {/* Notif */}
        {
            userInfo &&
            <div className="inrow">
                <svg onClick={() => catchNotifyIcon()} xmlns="http://www.w3.org/2000/svg" class="h-7 w-8 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="text-bold text-blue-500">

                </span>

                <span className="text-bold text-blue-500">{length > 0 && length}
                </span>
            </div>

        }

        <div class={`${onNotify === true ? '' : 'hidden'} absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20 right-12 top-11`} >
            <div class=" ">
                {
                    notis.length > 0 ? notis.map((o) =>
                        <div className={`incol ${!o.isRead && !read.includes(o._id) ? 'bg-gray-200' : 'bg-white'}`}>
                            <a onClick={() => { checkedStatus(o._id) }} class={` w-full flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2`}>
                                <img class="h-8 w-8 rounded-full object-cover mx-1" src={`http://localhost:3000/assets/imgs/products/${o.order.orderItems[0].thumbnail}`} alt="avatar" />
                                <p class="text-gray-600 text-sm mx-2 incol">
                                    {
                                        o.type === 1 ? <span class="font-bold" href="#">Đơn hàng #<span className="text-indigo-500">{o.orderid}</span> {o.content}</span> : <span class="font-bold" href="#">{o.content}</span>
                                    }
                                    <span class="ml-1 font-bold text-blue-500" onClick={() => { getOrder(o.orderid) }} >  Xem</span>
                                </p>
                                <div className="flex justify-end"><Moment className="text-sm flex justify-end" fromNow>{o.createdAt}</Moment></div>

                            </a>
                        </div>
                    )
                        :
                        (<div className="px-4 py-2">
                            <span className="text-sm">Hiện không có thông báo nào.</span>
                        </div>)
                }
            </div>
            {/* <a href="#" class="block bg-gray-800 text-white text-center font-bold py-2">Xem tất cả</a> */}
        </div>

        {/* <div className={` top-0 absolute ${onNotify === true ? '' : 'hidden'}  w-44 rounded-md shadow-lg top-12 right-44 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none`}>
<ul class="block w-full bg-white shadowdivide-y divide-gray-100">
{
orderUpdate && orderUpdate.map((o, i) =>
<div onClick={(o.process)}>
    <div className="inrow">
        <img className="h-8 w-10" src={`http://localhost:3000/assets/imgs/products/${o.orderItems[0].thumbnail}`} />
        <span className="text-sm">Trạng thái đơn hàng thay đổi
            <span className="ml-1 text-orange-300"> Xem</span>
        </span>
    </div>

</div>
)}
</ul>
</div> */}
        {/* Cart */}
        <div onClick={() => { cartEvent() }} >
            <div className="inrow">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="text-bold text-blue-500">{getCartCount()}</span>
            </div>
            <div>
                {!showCart ? '' : (<Cart />)}
            </div>
        </div>

        {/* <div className="group relative usericon">
<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
<div class="usericon-menu top-0 absolute hidden  w-36 rounded-md shadow-lg top-7 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
<ul class="block w-full bg-white shadowdivide-y divide-gray-100">
<li class="py-1"><a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">Item</a></li>
<li class="py-1"><a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">Item 2</a></li>
</ul>
</div>
</div> */}

        <div onClick={() => catchUserIcon()} className="group relative z-10 ">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className={`usericon-menu top-0 absolute ${onUser === true ? '' : 'hidden'}  w-44 rounded-md shadow-lg top-10 right-0 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none`}>
                <ul class="block w-full bg-white shadowdivide-y divide-gray-100">
                    {
                        userInfo ? (
                            <div className="z-40"><li onClick={e => window.location.href = '/user-view/user-' + userInfo.id} class="py-1"><a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">Xem thông tin</a></li>
                                <li onClick={() => { authService.logout() }} class="py-1"><a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">Đăng xuất</a></li></div>
                        )
                            : (
                                <div>
                                    <li onClick={e => window.location.href = '/login'} class="py-1"><a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">Đăng Nhập</a></li>
                                    <li onClick={e => window.location.href = '/register'} class="py-1"><a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">Đăng ký</a></li>
                                </div>
                            )
                    }
                </ul>
            </div>
        </div>

    </div>
</div>
</div>