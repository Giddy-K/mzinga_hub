import ContentForm from "@/app/components/ContentForm";


export default function NewContentPage() {
  return (
    <section className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Create New Content</h1>
      <ContentForm />
    </section>
  );
}
