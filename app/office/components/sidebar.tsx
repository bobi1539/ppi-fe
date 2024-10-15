import Link from "next/link";

export default function Sidebar() {
  const menus = [
    {
      id: 1,
      icon: "M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3L280 88c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 204.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z",
      name: "Dashboard",
      url: "/office/dashboard",
      subMenu: null
    },
    {
      id: 2,
      icon: "M224 0a128 128 0 1 1 0 256A128 128 0 1 1 224 0zM178.3 304l91.4 0c11.8 0 23.4 1.2 34.5 3.3c-2.1 18.5 7.4 35.6 21.8 44.8c-16.6 10.6-26.7 31.6-20 53.3c4 12.9 9.4 25.5 16.4 37.6s15.2 23.1 24.4 33c15.7 16.9 39.6 18.4 57.2 8.7l0 .9c0 9.2 2.7 18.5 7.9 26.3L29.7 512C13.3 512 0 498.7 0 482.3C0 383.8 79.8 304 178.3 304zM436 218.2c0-7 4.5-13.3 11.3-14.8c10.5-2.4 21.5-3.7 32.7-3.7s22.2 1.3 32.7 3.7c6.8 1.5 11.3 7.8 11.3 14.8l0 30.6c7.9 3.4 15.4 7.7 22.3 12.8l24.9-14.3c6.1-3.5 13.7-2.7 18.5 2.4c7.6 8.1 14.3 17.2 20.1 27.2s10.3 20.4 13.5 31c2.1 6.7-1.1 13.7-7.2 17.2l-25 14.4c.4 4 .7 8.1 .7 12.3s-.2 8.2-.7 12.3l25 14.4c6.1 3.5 9.2 10.5 7.2 17.2c-3.3 10.6-7.8 21-13.5 31s-12.5 19.1-20.1 27.2c-4.8 5.1-12.5 5.9-18.5 2.4l-24.9-14.3c-6.9 5.1-14.3 9.4-22.3 12.8l0 30.6c0 7-4.5 13.3-11.3 14.8c-10.5 2.4-21.5 3.7-32.7 3.7s-22.2-1.3-32.7-3.7c-6.8-1.5-11.3-7.8-11.3-14.8l0-30.5c-8-3.4-15.6-7.7-22.5-12.9l-24.7 14.3c-6.1 3.5-13.7 2.7-18.5-2.4c-7.6-8.1-14.3-17.2-20.1-27.2s-10.3-20.4-13.5-31c-2.1-6.7 1.1-13.7 7.2-17.2l24.8-14.3c-.4-4.1-.7-8.2-.7-12.4s.2-8.3 .7-12.4L343.8 325c-6.1-3.5-9.2-10.5-7.2-17.2c3.3-10.6 7.7-21 13.5-31s12.5-19.1 20.1-27.2c4.8-5.1 12.4-5.9 18.5-2.4l24.8 14.3c6.9-5.1 14.5-9.4 22.5-12.9l0-30.5zm92.1 133.5a48.1 48.1 0 1 0 -96.1 0 48.1 48.1 0 1 0 96.1 0z",
      name: "User",
      url: "/office/user",
      subMenu: null
    },
    {
      id: 3,
      icon: "M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z",
      name: "Committee",
      url: "/office/committee",
      subMenu: null
    },
  ];

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0">
      <div className="overflow-y-auto py-5 px-3 h-full bg-white">
        <ul className="mt-1 pt-2 space-y-1 border-t border-gray-200">
          {menus.map((menu) => (
            <li key={menu.id}>
              <Link href={menu.url} className="flex items-center gap-3 p-2 text-base rounded-lg group font-medium transition duration-200 text-secondary-700 hover:text-white hover:bg-secondary-700">
                <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d={menu.icon} />
                </svg>
                <span>{menu.name}</span>
              </Link>
            </li>
          ))}
          <li>
            <button type="button" className="flex items-center p-2 w-full text-base rounded-lg transition duration-75 group hover:bg-secondary-100 font-medium text-secondary-900 ">
              <svg aria-hidden="true" className="w-6 h-6 text-secondary-500 transition duration-75 group-hover:text-secondary-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"></svg> <span className="flex-1 ml-3 text-left whitespace-nowrap">Data</span>
              <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
            <ul id="dropdown-user-management" className=" hidden  py-2 space-y-2">
              <li>
                <a href="https://ppiwarwick.org/office/user/role" className="flex items-center p-2 pl-11 w-full text-base rounded-lg transition duration-75 group hover:bg-secondary-100 font-medium text-secondary-900 ">
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
                <a href="https://ppiwarwick.org/office/committee/data" className="flex items-center p-2 pl-11 w-full text-base rounded-lg transition duration-75 group hover:bg-secondary-100 font-medium text-secondary-900 ">
                  Data
                </a>
              </li>
              <li>
                <a href="https://ppiwarwick.org/office/committee/department" className="flex items-center p-2 pl-11 w-full text-base rounded-lg transition duration-75 group hover:bg-secondary-100 font-medium text-secondary-900 ">
                  Department
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
}
