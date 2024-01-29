import {
  FcRatings,
  FcProcess,
  FcPortraitMode,
  FcSurvey,
  FcIdea,
  FcAssistant,
  FcInfo,
} from "react-icons/fc";

export const DASHBOARD_TOP_LINKS = [
  {
    key: "dashboard",
    name: "Dashboard",
    path: "dashboard",
    icon: <FcRatings size={25} />,
  },
  {
    key: "events",
    name: "Events",
    path: "events",
    icon: <FcProcess size={25} />,
  },
  {
    key: "workshop",
    name: "Workshops",
    path: "workshop",
    icon: <FcPortraitMode size={25} />,
  },
  {
    key: "competition",
    name: "Competition",
    path: "competition",
    icon: <FcIdea size={25} />,
  },
  {
    key: "report",
    name: "Report",
    path: "report",
    icon: <FcSurvey size={25} />,
  },
];

export const DASHBOARD_BOTTOM_LINKS = [
  {
    key: "support",
    name: "Help & Support",
    path: "support",
    icon: <FcAssistant size={25} />,
  },
  {
    key: "about",
    name: "About",
    path: "about",
    icon: <FcInfo size={25} />,
  },
];
