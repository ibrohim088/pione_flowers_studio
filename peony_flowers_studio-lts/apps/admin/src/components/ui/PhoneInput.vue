<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps<{
    modelValue: string;
    label?: string;
    error?: string;
    disabled?: boolean;
}>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const PREFIX = '+998';

/** modelValue'dan +998'dan keyingi raqamlarni ajratib olish (faqat raqamlar, max 9 ta) */
function extractDigits(value: string): string {
    const withoutPrefix = value.startsWith(PREFIX) ? value.slice(PREFIX.length) : value;
    return withoutPrefix.replace(/\D/g, '').slice(0, 9);
}

const digits = ref(extractDigits(props.modelValue));

watch(
    () => props.modelValue,
    (val) => {
        const newDigits = extractDigits(val);
        if (newDigits !== digits.value) digits.value = newDigits;
    }
);

/** Ko'rinadigan formatlangan qiymat: "90 123 45 67" */
const formattedDigits = computed(() => {
    const d = digits.value;
    const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean);
    return parts.join(' ');
});

function handleInput(e: Event) {
    const raw = (e.target as HTMLInputElement).value;
    digits.value = raw.replace(/\D/g, '').slice(0, 9);
    emit('update:modelValue', PREFIX + digits.value);
}
</script>

<template>
    <div class="field">
        <label v-if="label">{{ label }}</label>
        <div class="phone-wrap" :class="{ error: !!error, disabled: !!disabled }">
            <span class="prefix">{{ PREFIX }}</span>
            <input type="tel" inputmode="numeric" autocomplete="tel-national" :value="formattedDigits"
                :disabled="disabled"  maxlength="12" @input="handleInput" />  <!-- placeholder="90 123 45 67" -->
        </div>
        <span v-if="error" class="error-text">{{ error }}</span>
    </div>
</template>

<style scoped lang="scss">
.field {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

label {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: var(--text-secondary);
}

.phone-wrap {
    display: flex;
    align-items: stretch;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--bg-primary);
    overflow: hidden;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    &:focus-within {
        border-color: var(--accent);
        box-shadow: 0 0 0 2px var(--accent-light);
    }

    &.error {
        border-color: var(--danger);
    }

    &.disabled {
        opacity: 0.6;
    }
}

.prefix {
    display: flex;
    align-items: center;
    padding: 10px 0 10px 14px;
    font-size: 14px;
    font-family: inherit;
    color: var(--text-secondary);
    user-select: none;
    pointer-events: none;
    white-space: nowrap;
}

input {
    flex: 1;
    min-width: 0;
    border: none;
    padding: 10px 14px 10px 6px;
    font-family: inherit;
    font-size: 14px;
    background: transparent;
    color: var(--text-primary);

    &::placeholder {
        color: var(--text-secondary);
        opacity: 0.6;
    }

    &:focus {
        outline: none;
    }

    &:disabled {
        cursor: not-allowed;
    }
}

.error-text {
    font-size: 12px;
    color: var(--danger);
}
</style>
