
import agentComissions from "@/pages/agent/agentComissions";
import AgentWalletPage from "@/pages/agent/agentWalletPage";


export const agentSidebarItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Wallet Overview",
        url: "/agent/wallet",
        component: AgentWalletPage,
      },
    ],
  },
  {
    title: "History",
    items: [
      {
        title: "Commission History",
        url: "/agent/commission-history",
        component: agentComissions,
      },
    ],
  },
];
