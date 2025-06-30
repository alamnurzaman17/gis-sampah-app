// src/components/panel/LegendDisplay.tsx
"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useMapStore } from "@/store/mapStore";
import { sampahColorRanges } from "@/lib/mapUtils";

const GradientLegendItem = ({
  color,
  range,
}: {
  color: string;
  range: string;
}) => (
  <div className="flex items-center space-x-3">
    <div className="w-5 h-5 rounded-sm" style={{ backgroundColor: color }} />
    <span className="text-sm">{range}</span>
  </div>
);

const LegendDisplay = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { activeSampahType } = useMapStore();

  const currentLegendItems = sampahColorRanges[activeSampahType];
  const legendTitle = activeSampahType.replace(" (kg)", "");

  return (
    <Card className="w-48 bg-card/90 shadow-xl backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between px-3 h-0">
        <CardTitle className="text-base font-semibold">Legend</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </Button>
      </CardHeader>
      {!isCollapsed && (
        <CardContent className="px-3 pt-0 border-t">
          <div className="flex justify-between items-center my-3">
            <h4 className="font-semibold">{legendTitle}</h4>
          </div>
          <div className="space-y-2">
            {currentLegendItems.map((item) => (
              <GradientLegendItem
                key={item.label}
                color={item.color}
                range={item.label}
              />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default LegendDisplay;
