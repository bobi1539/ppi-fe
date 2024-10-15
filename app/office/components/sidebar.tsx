export default function Sidebar() {

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0">
      <div className="overflow-y-auto py-5 px-3 h-full bg-white">
        <ul className="mt-4 space-y-1 border-t border-gray-200">
          <li></li>
          <li>
            <a href="https://ppiwarwick.org/office/home" className="flex items-center p-2 text-base rounded-lg hover:bg-secondary-100 group bg-secondary-500 text-white font-bold hover:text-secondary-900">
              <svg aria-hidden="true" className="w-6 h-6 text-secondary-500 transition duration-75 group-hover:text-secondary-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="ml-3">Home</span>
            </a>
          </li>
        </ul>
        <ul className="mt-1 pt-2 space-y-1 border-t border-gray-200">
          <li>
            <a href="https://ppiwarwick.org/office/dashboard" className="flex items-center p-2 text-base rounded-lg hover:bg-secondary-100 group font-medium text-secondary-900 ">
              <svg aria-hidden="true" className="w-6 h-6 text-secondary-500 transition duration-75 group-hover:text-secondary-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
              <span className="ml-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="https://ppiwarwick.org/office/user/data"
              className="flex items-center p-2 text-base rounded-lg hover:bg-secondary-100 group font-medium text-secondary-900 "
            >
              <svg aria-hidden="true" className="w-6 h-6 text-secondary-500 transition duration-75 group-hover:text-secondary-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" d="M17 10v1.1l1 .5.8-.8 1.4 1.4-.8.8.5 1H21v2h-1.1l-.5 1 .8.8-1.4 1.4-.8-.8a4 4 0 0 1-1 .5V20h-2v-1.1a4 4 0 0 1-1-.5l-.8.8-1.4-1.4.8-.8a4 4 0 0 1-.5-1H11v-2h1.1l.5-1-.8-.8 1.4-1.4.8.8a4 4 0 0 1 1-.5V10h2Zm.4 3.6c.4.4.6.8.6 1.4a2 2 0 0 1-3.4 1.4A2 2 0 0 1 16 13c.5 0 1 .2 1.4.6ZM5 8a4 4 0 1 1 8 .7 7 7 0 0 0-3.3 3.2A4 4 0 0 1 5 8Zm4.3 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h6.1a7 7 0 0 1-1.8-7Z" clipRule="evenodd" />
              </svg>
              <span className="ml-3">User</span>
            </a>
          </li>
          <li>
            <button
              type="button"
              className="flex items-center p-2 w-full text-base rounded-lg transition duration-75 group hover:bg-secondary-100 font-medium text-secondary-900 "
            >
              <svg aria-hidden="true" className="w-6 h-6 text-secondary-500 transition duration-75 group-hover:text-secondary-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"></svg> <span className="flex-1 ml-3 text-left whitespace-nowrap">Data</span>
              <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
            <ul id="dropdown-user-management" className=" hidden  py-2 space-y-2">
              <li>
                <a
                  href="https://ppiwarwick.org/office/user/role"
                  className="flex items-center p-2 pl-11 w-full text-base rounded-lg transition duration-75 group hover:bg-secondary-100 font-medium text-secondary-900 "
                >
                  Role
                </a>
              </li>
            </ul>
          </li>
          <li>
            <button type="button" className="flex items-center p-2 w-full text-base rounded-lg transition duration-75 group hover:bg-secondary-100 font-medium text-secondary-900  " aria-controls="dropdown-committee-management">
              <svg aria-hidden="true" className="w-6 h-6 text-secondary-500 transition duration-75 group-hover:text-secondary-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3a2.5 2.5 0 1 1 2-4.5M19.5 17h.5c.6 0 1-.4 1-1a3 3 0 0 0-3-3h-1m0-3a2.5 2.5 0 1 0-2-4.5m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3c0 .6-.4 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
              </svg>
              <span className="flex-1 ml-3 text-left whitespace-nowrap">Committee</span>
              <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
            <ul id="dropdown-committee-management" className=" hidden  py-2 space-y-2">
              <li>
                <a
                  href="https://ppiwarwick.org/office/committee/data"
                  className="flex items-center p-2 pl-11 w-full text-base rounded-lg transition duration-75 group hover:bg-secondary-100 font-medium text-secondary-900 "
                >
                  Data
                </a>
              </li>
              <li>
                <a
                  href="https://ppiwarwick.org/office/committee/department"
                  className="flex items-center p-2 pl-11 w-full text-base rounded-lg transition duration-75 group hover:bg-secondary-100 font-medium text-secondary-900 
   "
                >
                  Department
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="https://ppiwarwick.org/office/newsletter"
              className="flex items-center p-2 text-base rounded-lg 
      hover:bg-secondary-100 group 
       font-medium text-secondary-900 
      "
            >
              <svg aria-hidden="true" className="w-6 h-6 text-secondary-500 transition duration-75 group-hover:text-secondary-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7h1v12c0 .6-.4 1-1 1h-2a1 1 0 0 1-1-1V5c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v14c0 .6.4 1 1 1h11.5M7 14h6m-6 3h6m0-10h.5m-.5 3h.5M7 7h3v3H7V7Z" />
              </svg>
              <span className="ml-3">Newsletter</span>
            </a>
          </li>
          <li>
            <a
              href="https://ppiwarwick.org/office/gallery"
              className="flex items-center p-2 text-base rounded-lg 
      hover:bg-secondary-100 group 
       font-medium text-secondary-900 
      "
            >
              <svg aria-hidden="true" className="w-6 h-6 text-secondary-500 transition duration-75 group-hover:text-secondary-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M13 10c0-.6.4-1 1-1a1 1 0 1 1 0 2 1 1 0 0 1-1-1Z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M2 6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12c0 .6-.2 1-.6 1.4a1 1 0 0 1-.9.6H4a2 2 0 0 1-2-2V6Zm6.9 12 3.8-5.4-4-4.3a1 1 0 0 0-1.5.1L4 13V6h16v10l-3.3-3.7a1 1 0 0 0-1.5.1l-4 5.6H8.9Z" clipRule="evenodd" />
              </svg>
              <span className="ml-3">Gallery</span>
            </a>
          </li>
          <li>
            <a
              href="https://ppiwarwick.org/office/event"
              className="flex items-center p-2 text-base rounded-lg 
      hover:bg-secondary-100 group 
       font-medium text-secondary-900 
      "
            >
              <svg aria-hidden="true" className="w-6 h-6 text-secondary-500 transition duration-75 group-hover:text-secondary-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M13 10c0-.6.4-1 1-1a1 1 0 1 1 0 2 1 1 0 0 1-1-1Z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M2 6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12c0 .6-.2 1-.6 1.4a1 1 0 0 1-.9.6H4a2 2 0 0 1-2-2V6Zm6.9 12 3.8-5.4-4-4.3a1 1 0 0 0-1.5.1L4 13V6h16v10l-3.3-3.7a1 1 0 0 0-1.5.1l-4 5.6H8.9Z" clipRule="evenodd" />
              </svg>
              <span className="ml-3">Event</span>
            </a>
          </li>
        </ul>
        <ul className="mt-2 pt-2 space-y-1 border-t border-gray-200">
          <li></li>
          <li>
            <a
              href="https://ppiwarwick.org/office/menu"
              className="flex items-center p-2 text-base rounded-lg 
      hover:bg-secondary-100 group 
       font-medium text-secondary-900 
      "
            >
              <svg aria-hidden="true" className="w-6 h-6 text-secondary-500 transition duration-75 group-hover:text-secondary-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              <span className="ml-3">Menu</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
