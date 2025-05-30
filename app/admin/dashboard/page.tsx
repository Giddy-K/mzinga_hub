import { auth } from "@/auth";
import GoToTop from "../../components/GoToTop";
import Link from "next/link";
import {
  FaUsers,
  FaHive,
  FaChartLine,
  FaCogs,
  FaBell,
  FaFileAlt,
} from "react-icons/fa";
import AdminNavbar from "@/app/components/AdminNavbar";

export default async function AdminDashboard() {
  const session = await auth();

  // if (session?.user?.role !== "admin") {
  //   redirect("/unauthorized");
  // }

  const dashboardFeatures = [
    {
      title: "Beekeeping Data",
      description: "Monitor apiaries, hive health, and production stats.",
      icon: <FaHive size={30} />,
      href: "/admin/apiaries",
    },
    {
      title: "User Management",
      description: "Manage farmers, admins, and user roles.",
      icon: <FaUsers size={30} />,
      href: "/admin/users",
    },
    {
      title: "Analytics",
      description: "Track honey production, hive stats, and logs.",
      icon: <FaChartLine size={30} />,
      href: "/admin/analytics",
    },
    {
      title: "Content Management",
      description: "Publish blogs, training materials, and announcements.",
      icon: <FaFileAlt size={30} />,
      href: "/admin/content",
    },
    {
      title: "Notifications",
      description: "Send alerts or messages to all users.",
      icon: <FaBell size={30} />,
      href: "/admin/notifications",
    },
    {
      title: "Settings",
      description: "Update your profile or platform settings.",
      icon: <FaCogs size={30} />,
      href: "/admin/settings",
    },
  ];

  return (
    <>
      <AdminNavbar />
      <section className="min-h-screen bg-gray-100 py-20 px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome, {session?.user?.name}
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          You are logged in as an <strong>admin</strong>.
        </p>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {dashboardFeatures.map((feature) => (
            <Link
              href={feature.href}
              key={feature.title}
              className="bg-white hover:shadow-xl transition-shadow duration-200 shadow-md rounded-2xl p-6 flex flex-col gap-3 cursor-pointer border border-gray-200"
            >
              <div className="text-yellow-500">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <GoToTop />
    </>
  );
}
