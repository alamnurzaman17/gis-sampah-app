"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useMapStore } from "@/store/mapStore";

const LayerControl = () => {
  const { isDataVisible, toggleDataVisibility } = useMapStore();

  return (
    <Card className="absolute bg-gray-100 shadow-2xl text-black top-20 left-4 z-10 w-[180px] md:top-4 ">
      <CardHeader className="p-4">
        <CardTitle className="text-sm">Select Layer</CardTitle>
        <hr className="border-black border " />
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="data-dummy"
            checked={isDataVisible}
            onCheckedChange={toggleDataVisibility}
          />
          <Label
            htmlFor="data-dummy"
            className="text-sm font-medium leading-none"
          >
            Data Dummy
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default LayerControl;
