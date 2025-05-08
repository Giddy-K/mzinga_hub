import { auth } from "@/auth";
import Footer from "../../components/Footer.jsx";
import GoToTop from "../../components/GoToTop";
import AndroidLinkRedirect from "@/app/components/AndroidLinkRedirect";
import AdminNavbar from "@/app/components/AdminNavbar";
import { getUserApiaries } from "@/lib/firebase/getUserApiaries";

export default async function UserDashboard() {
  const session = await auth();
  const apiaries = session?.user?.id
    ? await getUserApiaries(session.user.id)
    : [];

  return (
    <>
      <AdminNavbar />
      <section className="hero_section px-4">
        <h1 className="bg-transparent py-5 font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-left my-5 font-work-sans">
          Welcome <br /> {session?.user?.name ?? "Guest"}..
        </h1>

        <p className="font-medium text-[20px] text-white max-w-2xl text-left break-words">
          Want to manage your apiaries? <br />
          Get started below.
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
              className="h-[60px] w-auto"
            />
          </a>
        </div>

        <AndroidLinkRedirect />

        {/* Apiaries Section */}
        {apiaries.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-white text-2xl font-bold mb-4">
              Your Apiaries
            </h2>
            <a
              href="/apiaries/new"
              className="inline-block mt-6 px-6 py-2 bg-gradient-to-r from-[#4B2E13] to-[#B76E29] text-white rounded-full shadow hover:scale-105 transition"
            >
              + Add New Apiary
            </a>
            <ul className="space-y-4">
              {apiaries.map((apiary) => (
                <li
                  key={apiary.id}
                  className="bg-white rounded-lg p-4 text-black shadow-sm"
                >
                  <h3 className="font-bold text-lg">{apiary.name}</h3>
                  <p className="text-sm">Location: {apiary.location}</p>
                  {/* Add more fields if needed */}
                  <a
                    href={`/apiaries/${apiary.id}`}
                    className="text-blue-500 hover:underline mt-2 inline-block"
                  >
                    View / Manage
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-white mt-10">
            No apiaries found. Add some to get started!
          </p>
        )}
      </section>

      <Footer />
      <GoToTop />
    </>
  );
}
