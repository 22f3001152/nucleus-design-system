export const toggleArgsType = {
    type: {
        description: "Type",
        defaultValue: "primary",
        table: {
            type: {
                summary: "text",
            },
            defaultValue: {
                summary: "primary",
            },
        },
        control: "select",
        options: ["primary", "secondary"],
    },
    disabled: {
        description: "disabled",
        defaultValue: false,
        table: {
            type: {
                summary: "boolean",
            },
            defaultValue: {
                summary: false,
            },
        },
        control: "radio",
        options: [true, false],
    },
    checked: {
        description: "checked",
        defaultValue: false,
        table: {
            type: {
                summary: "boolean",
            },
            defaultValue: {
                summary: "rounded",
            },
        },
        control: "radio",
        options: [true, false],
    },
    size: {
        description: "Size",
        defaultValue: "md",
        table: {
            type: {
                summary: "text",
            },
            defaultValue: {
                summary: "md",
            },
        },
        control: "select",
        options: ["xs", "sm", "md", "lg", "xl"],
    },
};
