// src/app/[locale]/search/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Users, Briefcase } from "lucide-react";
import { searchContent, getImageUrl } from "@/lib/api/strapi-client";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"services" | "team">("services");
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({
    services: [] as any[],
    team: [] as any[],
  });

  const query = searchParams.get("q") || "";
  const urlSection = searchParams.get("section") as "services" | "team";

  // Set active tab from URL
  useEffect(() => {
    if (urlSection === "services" || urlSection === "team") {
      setActiveTab(urlSection);
    }
  }, [urlSection]);

  // Fetch results when query or tab changes
  useEffect(() => {
    if (query) {
      fetchResults(activeTab);
    } else {
      setLoading(false);
    }
  }, [query, activeTab]);

  const fetchResults = async (section: "services" | "team") => {
    setLoading(true);
    try {
      const data = await searchContent(query, undefined, section);
      setResults({
        services: data.services || [],
        team: data.teamMembers || [],
      });
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle tab click - update URL and fetch
  const handleTabClick = (tab: "services" | "team") => {
    setActiveTab(tab);
    router.replace(`?q=${encodeURIComponent(query)}&section=${tab}`);
  };

  const currentResults =
    activeTab === "services" ? results.services : results.team;
  const count = currentResults.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          {query && (
            <p className="text-gray-600">
              Results for: <span className="font-semibold">"{query}"</span>
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Filter by</h3>

              <button
                onClick={() => handleTabClick("services")}
                className={`w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg text-left ${
                  activeTab === "services"
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Briefcase className="h-5 w-5" />
                <div className="flex-1">
                  <div className="font-medium">Services</div>
                  <div className="text-sm text-gray-500">
                    {activeTab === "services" ? `${count} results` : ""}
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleTabClick("team")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                  activeTab === "team"
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Users className="h-5 w-5" />
                <div className="flex-1">
                  <div className="font-medium">Team</div>
                  <div className="text-sm text-gray-500">
                    {activeTab === "team" ? `${count} results` : ""}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : count === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No {activeTab} found
                </h3>
                <p className="text-gray-500">
                  Try different keywords or browse other sections.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {activeTab === "services" ? "Services" : "Team Members"} (
                    {count})
                  </h2>
                </div>

                <div className="space-y-4">
                  {activeTab === "services"
                    ? results.services.map((service) => (
                        <ServiceResult key={service.id} service={service} />
                      ))
                    : results.team.map((member) => (
                        <TeamResult key={member.id} member={member} />
                      ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Service Result Component
function ServiceResult({ service }: { service: any }) {
  return (
    <a
      href={`/services/${service.attributes.slug}`}
      className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all"
    >
      <div className="flex items-start gap-4">
        {service.attributes.featuredImage?.data?.attributes?.url && (
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={getImageUrl(
                service.attributes.featuredImage.data.attributes.url,
              )}
              alt={service.attributes.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div>
          <h3 className="font-semibold text-gray-900 text-xl mb-2">
            {service.attributes.title}
          </h3>
          <p className="text-gray-600 mb-3">{service.attributes.description}</p>
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
            Service
          </span>
        </div>
      </div>
    </a>
  );
}

// Team Result Component
function TeamResult({ member }: { member: any }) {
  return (
    <a
      href={`/team#${member.id}`}
      className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all"
    >
      <div className="flex items-start gap-4">
        {member.attributes.image?.data?.attributes?.url && (
          <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={getImageUrl(member.attributes.image.data.attributes.url)}
              alt={member.attributes.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div>
          <h3 className="font-semibold text-gray-900 text-xl mb-1">
            {member.attributes.name}
          </h3>
          <p className="text-gray-600 text-lg mb-3">
            {member.attributes.position}
          </p>
          <p className="text-gray-500 mb-3">{member.attributes.bio}</p>
          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
            Team Member
          </span>
        </div>
      </div>
    </a>
  );
}
