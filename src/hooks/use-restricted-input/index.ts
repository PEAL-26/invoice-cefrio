import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';

type Value = string | number | readonly string[] | undefined;
interface UseRestrictedInputProps {
  type?: 'number' | 'literal';
  value?: Value;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

export function useRestrictedInput(
  props: UseRestrictedInputProps,
): [Value, (event: ChangeEvent<HTMLInputElement>) => void] {
  const { value, type, onChange } = props;
  const [currentValue, setCurrentValue] = useState<any>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (type === 'number' && !isNaN(Number(inputValue))) {
      setCurrentValue(inputValue);
      onChange?.(event);
    } else if (type === 'literal' && /^[a-zA-Z\s]*$/.test(inputValue)) {
      setCurrentValue(inputValue);
      onChange?.(event);
    } else if (type === undefined) {
      setCurrentValue(inputValue);
      onChange?.(event);
    }
  };

  useEffect(() => {
    setCurrentValue(value || '');
  }, [value]);

  return [currentValue, handleChange];
}
