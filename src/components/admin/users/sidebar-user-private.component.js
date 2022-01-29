import React, { Component, useState } from 'react'
import userService from '../../services/user.service';
import { useParams } from 'react-router-dom';
import authService from '../../services/auth.service';

const UserPrivateSidebar = ({ user }) => {
    const userId = authService.getCurrentUserId()
    return (
        <div className="user-sidebar">
            <a href="/items">
                <div className="text-2xl">
                    Guccdesis
                </div>
            </a>
            <div className="mt-11 h-26">

                {/* Ben user se la User profile component */}
                {/* <a href="/user-profile"> */}
                <a onClick={e => window.location.href = '/user-view/user-' + userId}>
                    <div className="flex flex-row h-11 pt-2 pl-2 pb-2 rounded-xl mt-3 hover:bg-see hover:text-gray-50 hover:shadow-coldblue active:bg-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <div className="text-lg ml-2 mb-10">Thông tin cá nhân</div>
                    </div>
                </a>
                {/* Thong bao don hang da duoc admin duyet o cho nay */}
                {/* <div className="flex flex-row h-11 pt-2 pl-2 pb-2 rounded-xl mt-3 hover:bg-see hover:text-gray-50 hover:shadow-coldblue active:bg-blue-800;">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <div className="inrow">
                        <div className="text-lg ml-2 mb-10">Thông báo</div>
                        <div className="ml-3 mb-8 text-sm text-white text-center pt-1.5 h-8 w-8 rounded-full bg-red-600">2</div>
                    </div>
                </div> */}
            </div>

            {/* Xem gio hang - UserItemsCart component */}
            <a href="/user-view/orders-list">
                <div className="flex flex-row h-11 pt-2 pl-2 pb-2 rounded-xl mt-3 hover:bg-see hover:text-gray-50 hover:shadow-coldblue active:bg-blue-800;">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="text-lg ml-2 mb-10">Đơn hàng đã đặt</div>
                </div>
            </a>

            <a href="/user-view/forgot-password">
                <div className="flex flex-row h-11 pt-2 pl-2 pb-2 rounded-xl mt-3 hover:bg-see hover:text-gray-50 hover:shadow-coldblue active:bg-blue-800;">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    <div className="text-lg ml-2 mb-10">Đổi mật khẩu</div>
                </div>
            </a>
        </div>
    );
}
export default UserPrivateSidebar