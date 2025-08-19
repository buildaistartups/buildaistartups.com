import React, { useState } from "react";
import { Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function PricingLight() {
  const [yearly, setYearly] = useState(false);

  const plans = [
    {
      name: "Pro",
      price: 24,
      features: {
        usage: ["100", "4", "Unlimited", "1"],
        features: [true, true, true, false, false, false],
        support: [false],
      },
    },
    {
      name: "Team",
      price: 49,
      features: {
        usage: ["250", "Unlimited", "Unlimited", "5"],
        features: [true, true, true, true, false, false],
        support: [true],
      },
    },
    {
      name: "Enterprise",
      price: 79,
      features: {
        usage: ["Unlimited", "Unlimited", "Unlimited", "Unlimited"],
        features: [true, true, true, true, true, true],
        support: [true],
      },
    },
  ];

  const sections = [
    {
      name: "Usage",
      items: [
        "Social Connections",
        "Custom Domains",
        "User Role Management",
        "External Databases",
      ],
    },
    {
      name: "Features",
      items: [
        "Custom Connection",
        "Advanced Deployment Options",
        "Extra Add-ons",
        "Admin Roles",
        "Deploy and Monitor",
        "Enterprise Add-ons",
      ],
    },
    {
      name: "Support",
      items: ["Premium Support"],
    },
  ];

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <Switch
            checked={yearly}
            onCheckedChange={setYearly}
            className="mb-8"
          />
          <div className="grid grid-cols-4 gap-8">
            <div className="space-y-10">
              {sections.map((section) => (
                <div key={section.name}>
                  <p className="text-sm font-semibold text-black mb-4">{section.name}</p>
                  <ul className="space-y-4">
                    {section.items.map((item) => (
                      <li key={item} className="text-sm text-gray-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {plans.map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl bg-white shadow-lg p-8 ring-1 ring-gray-200"
              >
                <h3 className="text-lg font-semibold text-purple-600">{plan.name}</h3>
                <p className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold tracking-tight text-black">
                    ${yearly ? plan.price * 12 * 0.8 : plan.price}
                  </span>
                  <span className="text-lg font-medium text-black">/mo</span>
                </p>
                <p className="mt-6 text-sm text-gray-600">
                  Everything at your fingertips.
                </p>
                <Button className="mt-8 w-full bg-purple-500 text-white hover:bg-purple-600">
                  {plan.name === "Team" ? "Get Started" : "→"}
                </Button>

                <div className="mt-10 space-y-8">
                  {sections.map((section) => (
                    <div key={section.name}>
                      <ul className="space-y-4">
                        {section.items.map((item, i) => (
                          <li key={item} className="flex items-center">
                            {plan.features[section.name.toLowerCase()][i] ? (
                              <Check className="h-5 w-5 flex-none text-purple-500" />
                            ) : (
                              <span className="h-5 w-5 flex-none" />
                            )}
                            <span className="ml-3 text-sm text-gray-900">
                              {typeof plan.features[section.name.toLowerCase()][i] ===
                              "string"
                                ? plan.features[section.name.toLowerCase()][i]
                                : ""}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
