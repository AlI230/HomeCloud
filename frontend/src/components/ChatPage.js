import React from 'react'

export const ChatPage = () => {
    return (
        <div className="justify-between flex flex-col h-full">
            <div className="flex flex-col space-y-4 items-start overflow-y-auto">
                <div className="max-w-lg inline-block px-4 py-2 bg-gray-200 rounded-t-lg rounded-br-lg">
                    lksmdjflmkqsdjlfqsdnf
                </div>                     
                <div className="max-w-lg inline-block px-4 self-end py-2 bg-blue-500 rounded-t-lg rounded-bl-lg text-white">
                    lksmdjflmkqsdjlfqsdnf
                    lkfqsmlfj
                </div>            
                <div className="max-w-lg inline-block px-4 self-end py-2 bg-blue-500 rounded-t-lg rounded-bl-lg text-white">
                    lksmdjflmkqsdjlfqsdnf
                    lkfqsmlfj
                </div>
                <div className="max-w-md inline-block px-4 py-2 bg-gray-200 rounded-t-lg rounded-br-lg">
                    lksmdjflmkqsdjlfqsdnf
                    lksmdjflmkqsdjlfqsdnf
                    lksmdjflmkqsdjlfqsdnf
                    lksmdjflmkqsdjlfqsdnf
                    lksmdjflmkqsdjlfqsdnf
                    lksmdjflmkqsdjlfqsdnf
                    lksmdjflmkqsdjlfqsdnf
                    lksmdjflmkqsdjlfqsdnf
                    lksmdjflmkqsdjlfqsdnf
                    lksmdjflmkqsdjlfqsdnf
                    lksmdjflmkqsdjlfqsdnf
                </div>             
            </div>
            <div class="mt-2 border-t border-gray-200 pt-4 mb-1 sm:mb-0">
                <div class="relative flex">
                    <input type="text" placeholder="Write Something" class="w-full focus:outline-none border border-black focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-6 rounded-full py-2" />
                    <div class="absolute right-2 items-center inset-y-0 hidden sm:flex">
                        <button type="button" class="inline-flex items-center justify-center rounded-full h-9 w-9 text-black focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}