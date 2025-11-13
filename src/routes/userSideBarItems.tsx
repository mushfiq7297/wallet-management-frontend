import WalletPage from "@/pages/user/WalletPage";
import UserTransactions from "@/pages/user/userTransactions";
import { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Wallet",
    items: [
      {
        title: "Overview",
        url: "/user/wallet",
        component: WalletPage,
      },
     
    ],
  },
  {
    title: "History",
    items: [
      {
        title: "Transaction History",
        url: "/user/transactions",
        component: UserTransactions,
      },
    ],
  },
];
