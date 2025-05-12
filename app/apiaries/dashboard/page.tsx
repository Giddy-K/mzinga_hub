import { auth } from "@/auth";
import Link from "next/link";
import { formatDate } from "@/lib/utils/formatDate";
import GoToTop from "../../components/GoToTop";
import AndroidLinkRedirect from "@/app/components/AndroidLinkRedirect";
import AdminNavbar from "@/app/components/AdminNavbar";
import { addApiaryForUser } from "@/lib/firebase/pushNewApiary.js";
import { getUserRealtimeApiaries } from "@/lib/firebase/getUserRealtimeApiaries";

export default async function UserDashboard() {
  const session = await auth();
  // const apiaries = session?.user?.id
  //   ? await getUserApiaries(session.user.id)
  //   : [];

  const apiaries = session?.user?.email
    ? await getUserRealtimeApiaries(session.user.email)
    : [];

  return (
    <>
      <AdminNavbar />
      <section className="hero_section px-4">
        <h1 className="bg-black/11 p-6 rounded-xl backdrop-blur-[1px] bg-transparent py-5 font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-left my-5 font-work-sans">
          Welcome {session?.user?.name ?? "Guest"}...
        </h1>

        <p className="bg-black/11 p-6 rounded-xl backdrop-blur-[1px] font-medium text-[20px] text-white max-w-2xl text-left break-words">
          Want to manage your apiaries? <br />
          Get started below... Download the app for more control.
        </p>

        {/* Google Play CTA */}
        <div className="mt-6">
          <a
            href="https://play.google.com/store/apps/details?id=com.example.yourapp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-transform hover:scale-105"
          >
            <img
              alt="Get it on Google Play"
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              className="h-[100px] w-auto"
            />
          </a>
        </div>

        <AndroidLinkRedirect />

        {/* Apiaries Section */}
        {apiaries.length > 0 ? (
          <div className="mt-10">
            <h2 className="bg-black/11 p-6 rounded-xl backdrop-blur-[1px] text-white text-2xl font-bold mb-4">
              Your Apiaries
            </h2>
            <div className="flex justify-between items-center mt-10">
              <Link
                href="/apiaries/new"
                className="px-4 py-2 bg-gradient-to-r from-[#4B2E13] to-[#B76E29] text-white rounded-full shadow hover:scale-105 transition text-sm"
              >
                + Add New Apiary
              </Link>
            </div>
            <div className="flex justify-center mt-6">
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {apiaries.map((apiary) => (
                  <div
                    key={apiary.id}
                    className="bg-gradient-to-br from-yellow-50 to-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all w-72"
                  >
                    <h3 className="text-xl font-bold text-[#4B2E13] mb-2">
                      {apiary.title}
                    </h3>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Location:</strong> {apiary.location}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Hives:</strong> {apiary.numberOfHives}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Notes:</strong> {apiary.notes}
                    </p>
                    <p className="text-sm text-gray-600 mt-2 italic">
                      Added on {new Date(apiary.dateAdded).toLocaleDateString()}
                    </p>
                    <Link
                      href={`/apiaries/${apiary.id}`}
                      className="inline-block mt-4 text-sm text-amber-600 font-semibold hover:underline"
                    >
                      View / Manage →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="bg-black/11 p-6 rounded-xl backdrop-blur-[1px] text-white mt-10">
            No apiaries found. Download the App to get started!
          </p>
        )}
      </section>
      <div className="footer-bottom border-t border-gray-700 pt-6 mt-0 mb-6 text-center">
        <p className="copyright text-sm">
          &copy; 2025{" "}
          <Link
            href="mailto:hubmzinga@gmail.com"
            className="copyright-link hover:text-amber-300 transition"
          >
            hubmzinga@gmail.com
          </Link>{" "}
          - MzingaHub Team. All Rights Reserved
        </p>
      </div>
      <GoToTop />
    </>
  );
}
