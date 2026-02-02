"use client";
import { useState } from "react";
import type { NestedCategories, SidebarProps } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = ({
  categories,
  selectedOption,
  handleChange,
}: SidebarProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderNestedCategories = (
    data: NestedCategories,
    parentKey = ""
  ): React.ReactNode => {
    return Object.keys(data).map((key) => {
      const hasChildren = Object.keys(data[key]).length > 0;
      const uniqueKey = parentKey ? `${parentKey}-${key}` : key;

      return (
        <div key={uniqueKey} className="ml-1">
          <div
            className={cn(
              "cursor-pointer flex items-center gap-2.5 py-2.5 px-3 rounded-lg transition-all duration-200",
              hasChildren
                ? "font-semibold text-foreground hover:bg-accent hover:text-accent-foreground"
                : "font-normal text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
            onClick={() => hasChildren && toggleExpand(uniqueKey)}
          >
            {hasChildren && (
              <span className="flex items-center text-primary">
                {expanded[uniqueKey] ? (
                  <ChevronDown className="h-4 w-4 transition-transform" />
                ) : (
                  <ChevronRight className="h-4 w-4 transition-transform" />
                )}
              </span>
            )}
            {!hasChildren && <span className="w-4" />}
            <span className="text-sm leading-relaxed">{key}</span>
          </div>
          {hasChildren && expanded[uniqueKey] && (
            <div className="ml-6 border-l-2 border-primary/20 pl-3 mt-1 space-y-0.5">
              {renderNestedCategories(data[key] as NestedCategories, uniqueKey)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="w-64 h-[100vh] flex flex-col bg-gradient-to-b from-background to-muted/10 border-r-2 overflow-hidden">
      {/* Fixed Categories Card at Top */}
      <div className="p-5 pb-0 flex-shrink-0">
        <Card className="shadow-md border-2">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Categories
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Select
              value={selectedOption}
              onValueChange={(value) => {
                const syntheticEvent = {
                  target: { value },
                } as React.ChangeEvent<HTMLSelectElement>;
                handleChange(syntheticEvent);
              }}
            >
              <SelectTrigger className="h-10 border-2 focus:border-primary transition-all">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="IMF">IMF</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Scrollable Homepage Card */}
      <div className="flex-1 flex flex-col overflow-hidden p-5 pt-5">
        <Card className="shadow-md border-2 flex flex-col flex-1 overflow-hidden">
          <CardHeader className="pb-4 flex-shrink-0">
            <CardTitle className="text-xl font-bold tracking-tight flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full"></span>
              Homepage
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 flex-1 overflow-y-auto">
            <div className="space-y-1">
              {renderNestedCategories(categories)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sidebar;
