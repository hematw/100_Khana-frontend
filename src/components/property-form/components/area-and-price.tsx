// import React from 'react'


// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm, UseFormRegister, UseFormReturn } from "react-hook-form"
// import { z } from "zod"

// import { toast } from "@/hooks/use-toast"
// import { Button } from "@/components/ui/button"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { IPropertyForm } from "../add-home"
import { UseFormReturn } from "react-hook-form"
import { MultiSelect } from "../../multi-select"
import { useEffect, useState } from "react"
import axiosIns from "@/axios"


type TFacility = {
    name: string,
    _id: string,
    description: string,
    icon: string,
}


function AreaAndPrice({ form }: { form: UseFormReturn<IPropertyForm> }) {
    const [facilities, setFacilities] = useState<TFacility[]>([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const { data } = await axiosIns.get('/facilities')
                console.log(data)
                setFacilities(data.facilities)
            } catch (error) {
                console.error(error)
            }
        }
        fetchCategories()
    }, [])

    return (
        <>
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Enter your house’s total area (m<sup>2</sup>).</FormLabel>
                        <FormControl>
                            <Input placeholder="Penthouse in Bamiyan" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Set your asking price.</FormLabel>
                        <FormControl>
                            <Input placeholder="Big House like a palace" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Select the features and amenities your property includes.</FormLabel>
                        <MultiSelect
                            value={field.value}
                            options={facilities.map(c => ({ label: c.name, value: c._id }))}
                            onValueChange={field.onChange}
                            placeholder="Facilities"
                        />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>How would you like to list your property? (For Sale, Rent, or Mortgage)</FormLabel>
                        <MultiSelect
                            value={field.value}
                            options={["Rental", "Sale", "Mortgage"].map(item => ({ label: item, value: item }))}
                            onValueChange={field.onChange}
                            placeholder="Listing Type"
                        />
                    </FormItem>
                )}
            />
        </>
    )
}
export default AreaAndPrice

// {step === 2 && (
//     <>
//       {/* Description */}
//       <InputGroup label="Description" text="Description about your place.">
//         <div className="my-2">
//           <textarea
//             {...register("desc", { required: true })}
//             placeholder="Ex: Beautiful house with a big pool..."
//             className="w-full h-32 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-400 transition-all duration-200 resize-none"
//           />
//           {errors.desc && (
//             <p className="text-red-500 text-sm mt-1">Description is required.</p>
//           )}
//         </div>
//       </InputGroup>
//     </>
//   )}

//   {step === 3 && (
//     <>
//       {/* Facilities */}
//       <InputGroup
//         label="Facilities"
//         text="Choose your place's facilities and amenities. Click to select."
//       >
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
//           {[
//             { id: "tv", icon: <IoTvOutline />, label: "TV" },
//             { id: "ac", icon: <TbAirConditioning />, label: "AC" },
//             { id: "wifi", icon: <FaWifi />, label: "WiFi" },
//             { id: "water", icon: <FaBottleWater />, label: "Drinking Water" },
//             { id: "parking", icon: <FaCarSide />, label: "Parking" },
//             { id: "pool", icon: <FaSwimmingPool />, label: "Pool" },
//             { id: "elevator", icon: <PiElevatorLight />, label: "Elevator" },
//             { id: "guard", icon: <GuardIcon />, label: "Guard" },
//           ].map((facility) => (
//             <div
//               key={facility.id}
//               className="border-2 border-gray-300 rounded-lg p-3 flex items-center justify-center gap-2 cursor-pointer hover:border-red-400 transition-all duration-200"
//             >
//               <input
//                 type="checkbox"
//                 id={facility.id}
//                 {...register(facility.id)}
//                 className="hidden"
//               />
//               <label htmlFor={facility.id} className="flex items-center gap-2 cursor-pointer">
//                 <span className="text-xl">{facility.icon}</span>
//                 <span>{facility.label}</span>
//               </label>
//             </div>
//           ))}
//         </div>
//       </InputGroup>
//     </>
//   )}