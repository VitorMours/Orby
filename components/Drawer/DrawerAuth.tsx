import { Home, Settings, LogIn, User2 } from "lucide-react";
import useState from "react";

export default function Drawer() {

    return (
        <div className="drawer-side is-drawer-close:overflow-visible" role="complementary">
            <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="flex min-h-full flex-col items-start bg-base-100 is-drawer-close:w-14 is-drawer-open:w-64">
                <ul className="menu w-full grow gap-4">
                    <li>
                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                            <Home size={16} />
                            <span className="is-drawer-close:hidden font-bold">Homepage</span>
                        </button>
                    </li>
                    <li>
                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                            <Settings size={16} />
                            <span className="is-drawer-close:hidden font-bold">Settings</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );

}
