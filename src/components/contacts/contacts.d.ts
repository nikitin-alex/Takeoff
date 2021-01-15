interface ContactProps {
    id?: number;
    name?: string;
    surname?: string;
}

interface OutputContactProps {
    id?: number;
    name: string;
    surname: string;
}

interface SubmitProps {
    onSumbit: (data: OutputContactProps) => void;
    onCancel: () => void;
}

type DataProps = Required<ContactProps>