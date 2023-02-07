import React, { ReactElement, useEffect } from "react";

// syncfusion components
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

// icons
import { AiOutlineMenu } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiNotification3Line } from "react-icons/ri";

// image
import avatar from "../data/avatar.jpg";

// components
import { Cart, Chat, Notification, UserProfile } from ".";

// Context API
import { useStateContext } from "../context/ContextProvider";

interface INavButton {
  title: string;
  customFunc: () => void;
  color: string;
  dotColor: string;
  icon: ReactElement;
}

const NavButton = ({
  title,
  customFunc,
  icon,
  color,
  dotColor,
}: INavButton) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ backgroundColor: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      >
        {icon}
      </span>
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const stateContext = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize)
  }, []);
  
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize)
  }, []);

  if (stateContext === null) return <div>No Context Yet</div>;

  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
  } = stateContext;

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prevState) => !prevState)}
        color="blue"
        icon={<AiOutlineMenu />}
        dotColor=""
      />
      <div className="flex">
        <NavButton
          title="Cart"
          customFunc={() => handleClick("cart")}
          color="blue"
          icon={<FiShoppingCart />}
          dotColor=""
        />
        <NavButton
          title="Chat"
          customFunc={() => handleClick("chat")}
          color="blue"
          icon={<BsChatLeft />}
          dotColor="#03c9d7"
        />
        <NavButton
          title="Notifications"
          customFunc={() => handleClick("notification")}
          color="blue"
          icon={<RiNotification3Line />}
          dotColor=""
        />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <img
              src={avatar}
              className="rounded-full w-8 h-8"
              alt="profile avatar"
            />
            <p className="text-gray-400 text-14">
              <span>Hi, </span>
              <span className="font-bold ml-1">Michael</span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
