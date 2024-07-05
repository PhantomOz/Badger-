
import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';


const RadioContainer = ({ className, children, ...props }: { className: string, children: React.ReactNode }) => {
    return (
        <RadioGroup.Root
            className={className}
            {...props}
        >
            {children}
        </RadioGroup.Root>);
}

export default RadioContainer;