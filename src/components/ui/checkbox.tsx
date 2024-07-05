import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

export default function CheckBox({ id, ...props }: { id: string }) {
    return (
        <Checkbox.Root
            className="shadow-blackA4 hover:bg-violet3 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
            id={id}
            {...props}
        >
            <Checkbox.Indicator className="text-violet11">
                <CheckIcon />
            </Checkbox.Indicator>
        </Checkbox.Root>
    )
}