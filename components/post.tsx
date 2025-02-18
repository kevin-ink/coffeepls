import { Heart } from "lucide-react"
import { MessageSquare } from "lucide-react"

export default function Post() {
    return (
        <div className="w-full h-auto flex flex-col gap-y-2 p-5 border-primary border-t-2 first:border-t-0 hover:cursor-pointer">
            <div className="flex flex-row gap-x-2 items-center">
                <span className="text-md">
                    {placeholder.username}
                </span>
                <p className="text-sm text-gray-700">
                    {placeholder.time}
                </p>
            </div>
            <div className="text-lg font-bold">
                {placeholder.item} at {placeholder.location}
            </div>
            <p>{placeholder.content}</p>
            <div className="flex flex-row gap-x-4">
                <Heart size={24} className="hover:cursor-pointer hover:fill-red-500"/>
                <MessageSquare size={24} className="hover:cursor-pointer hover:fill-primary" />
                <span className="text-sm text-gray-700">
                    {placeholder.datetime}
                </span>
            </div>
        </div>
    )
}

const placeholder = {
    username: "Username",
    time: "1 hour ago",
    content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
    item: "Espresso",
    location: "Starbucks",
    datetime: "14:24PM 12/12/2021"
}