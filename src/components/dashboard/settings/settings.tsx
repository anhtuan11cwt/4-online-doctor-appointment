"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettings from "./general-settings";

const tabs = [
  { label: "Chung", value: "general" },
  { label: "Bảo mật", value: "security" },
  { label: "Tích hợp", value: "integrations" },
  { label: "Tổ chức", value: "organizations" },
  { label: "Nâng cao", value: "advanced" },
  { label: "Hỗ trợ", value: "support" },
];

export default function Settings() {
  return (
    <Tabs className="w-full" defaultValue="general">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="general">
        <GeneralSettings />
      </TabsContent>
      <TabsContent value="security">
        <p className="text-muted-foreground text-sm">
          Cài đặt bảo mật sẽ sớm được cập nhật.
        </p>
      </TabsContent>
      <TabsContent value="integrations">
        <p className="text-muted-foreground text-sm">
          Tích hợp sẽ sớm được cập nhật.
        </p>
      </TabsContent>
      <TabsContent value="organizations">
        <p className="text-muted-foreground text-sm">
          Quản lý tổ chức sẽ sớm được cập nhật.
        </p>
      </TabsContent>
      <TabsContent value="advanced">
        <p className="text-muted-foreground text-sm">
          Cài đặt nâng cao sẽ sớm được cập nhật.
        </p>
      </TabsContent>
      <TabsContent value="support">
        <p className="text-muted-foreground text-sm">
          Hỗ trợ sẽ sớm được cập nhật.
        </p>
      </TabsContent>
    </Tabs>
  );
}
