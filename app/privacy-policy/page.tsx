export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        At MzingaHub, we are committed to protecting your personal information and your right to privacy.
        This Privacy Policy describes what information we collect, how we use it, and your rights in relation to it.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Email address, names, and account login details</li>
        <li>Apiary activity and usage logs</li>
        <li>Google sign-in metadata (if used)</li>
        <li>Device and browser information</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>To provide and maintain our services</li>
        <li>To improve user experience and app security</li>
        <li>To send updates or respond to user requests</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Services</h2>
      <p className="mb-4">
        We use Firebase (Google) for authentication, data storage, and analytics. Your data is handled in compliance with Google’s privacy and security standards.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
      <p className="mb-4">
        You can request access, correction, or deletion of your personal data by emailing us at <a href="mailto:hubmzinga@gmail.com" className="text-amber-300">hubmzinga@gmail.com</a>.
      </p>

      <p className="mt-8 text-sm text-gray-500">
        Last updated: June 10, 2025
      </p>
    </div>
  );
}
