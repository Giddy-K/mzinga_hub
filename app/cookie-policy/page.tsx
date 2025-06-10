export default function CookiePolicyPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
      <p className="mb-4">
        This Cookie Policy explains how MzingaHub ("we", "us", or "our") uses cookies and similar technologies when you visit our website <strong>https://mzinga-hub.vercel.app</strong>.
      </p>

      <h2 className="text-xl font-semibold mt-6">What are Cookies?</h2>
      <p className="mb-4">
        Cookies are small text files placed on your device by websites you visit. They help improve functionality, remember user preferences, analyze site performance, and provide personalized content.
      </p>

      <h2 className="text-xl font-semibold mt-6">Types of Cookies We Use</h2>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li><strong>Essential Cookies:</strong> Required for core website features such as user authentication and security. These cannot be disabled.</li>
        <li><strong>Functional Cookies:</strong> Enable enhanced functionality like remembering user settings or preferences.</li>
        <li><strong>Analytics Cookies:</strong> Collect anonymous information on how visitors use our website (e.g., Google Analytics) to help us improve performance.</li>
        <li><strong>Third-Party Cookies:</strong> Set by external providers (e.g., Google) to support services like embedded videos, maps, or ad personalization.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">Managing Cookies</h2>
      <p className="mb-4">
        You can manage your cookie preferences through the banner on your first visit or change them at any time in your browser settings. Most browsers allow you to block or delete cookies. However, disabling some cookies may impact website functionality.
      </p>

      <h2 className="text-xl font-semibold mt-6">Third-Party Services</h2>
      <p className="mb-4">
        We may use services like Google Analytics or Firebase that place cookies. These services are subject to their own privacy and cookie policies. You can opt out of Google Analytics tracking via <a href="https://tools.google.com/dlpage/gaoptout" className="underline text-blue-600" target="_blank">this tool</a>.
      </p>

      <h2 className="text-xl font-semibold mt-6">Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Cookie Policy to reflect changes in our practices or legal obligations. We encourage you to review it periodically.
      </p>

      <h2 className="text-xl font-semibold mt-6">Contact Us</h2>
      <p>
        If you have any questions about our use of cookies, contact us at: <a href="mailto:support@mzingahub.com" className="underline text-blue-600">support@mzingahub.com</a>
      </p>
    </main>
  );
}
