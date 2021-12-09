import React from 'react'
import './index.css'

export default function CheckoutSteps(props) {
    return (
        // <div className="row checkout-steps">
        //     <div className={props.step1 ? 'active' : ''}>Sign In</div>
        //     <div className={props.step2 ? 'active' : ''}>Shipping</div>
        //     {/* <div className={props.step3 ? 'active' : ''}>Payment</div> */}
        //     <div className={props.step3 ? 'active' : ''}>Place Order</div>
        // </div>

        <div className="p-11 bg-white h-30 w-full rounded-b-md ring-1 ring-gray-200">
            <div className="flex">
                <div className="w-1/4">
                    <div className="relative mb-2">
                        <div className={`w-10 h-10 mx-auto ${props.step1 && 'bg-green-500'} border-2 border-gray-200 rounded-full text-lg text-white flex items-center`}>
                            <span className="text-center text-white w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className="text-xs text-center md:text-base">Đăng nhập</div>
                </div>
                <div className="w-1/4">
                    <div className="relative mb-2">
                        <div className="absolute flex align-center items-center align-middle content-center" style={{ width: 'calc(100% - 2.5rem - 1rem)', top: '50%', transform: 'translate(-50%, -50%)' }}>
                            <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                <div className={`w-0 bg-green-300 py-1 rounded ${props.step1 && 'w-full'}`} />
                            </div>
                        </div>
                        <div className={`w-10 h-10 mx-auto ${props.step2 && 'bg-green-500'} border-2 border-gray-200 rounded-full text-lg text-white flex items-center`}>
                            <span className="text-center text-white w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className="text-xs text-center md:text-base">Thông tin vận chuyển</div>
                </div>
                <div className="w-1/4">
                    <div className="relative mb-2">
                        <div className="absolute flex align-center items-center align-middle content-center" style={{ width: 'calc(100% - 2.5rem - 1rem)', top: '50%', transform: 'translate(-50%, -50%)' }}>
                            <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                <div className={`w-0 bg-green-300 py-1 rounded ${props.step2 && 'w-full'}`} />
                            </div>
                        </div>
                        <div className={`w-10 h-10 mx-auto ${props.step3 && 'bg-green-500'} border-2 border-gray-200 rounded-full text-lg text-white flex items-center`}>
                            <span className="text-center text-gray-600 w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" class={`h-5 w-5 w-full stroke-current ${props.step3 ? 'text-white' : 'text-black'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className="text-xs text-center md:text-base">Đặt hàng</div>
                </div>
                <div className="w-1/4">
                    <div className="relative mb-2">
                        <div className="absolute flex align-center items-center align-middle content-center" style={{ width: 'calc(100% - 2.5rem - 1rem)', top: '50%', transform: 'translate(-50%, -50%)' }}>
                            <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                <div className={`w-0 bg-green-300 py-1 rounded ${props.step3 && 'w-full'}`} />
                            </div>
                        </div>
                        <div className={`w-10 h-10 mx-auto ${props.step4 && 'bg-green-500'} border-2 border-gray-200 rounded-full text-lg text-white flex items-center`}>
                            <span className="text-center text-gray-600 w-full">
                                <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
                                    <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className="text-xs text-center md:text-base">Đặt hàng thành công</div>
                </div>
            </div>
        </div>
    );
}
