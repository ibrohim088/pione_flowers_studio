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

// Tashqaridan modelValue o'zgarsa (masalan formani tozalashda), inputni sinxronlash
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

/** +998'ni o'chirish, ortga siljitish yoki tanlashga urinishlarni bloklash uchun emas —
 * prefiks alohida, tahrirlanmaydigan elementda ko'rsatiladi, shuning uchun buning hojati yo'q. */
</script>

<template>
    <div class="field">
        <label v-if="label" class="label-caps">{{ label }}</label>
        <div class="phone-wrap" :class="{ error: !!error, disabled: !!disabled }">
            <span class="prefix">{{ PREFIX }}</span>
            <input type="tel" inputmode="numeric" autocomplete="tel-national" :value="formattedDigits"
                :disabled="disabled" placeholder="90 123 45 67" maxlength="12" @input="handleInput" />
        </div>
        <span v-if="error" class="error-text">{{ error }}</span>
    </div>
</template>

<style scoped lang="scss">
.field {
    display: flex;
    flex-direction: column;
    gap: var(--unit);
}

label {
    color: var(--color-on-surface-variant);
}

.phone-wrap {
    display: flex;
    align-items: stretch;
    border: 1px solid var(--color-hairline);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    overflow: hidden;
    transition: border-color 0.2s;

    &:focus-within {
        border-color: var(--color-primary);
    }

    &.error {
        border-color: var(--color-error);
    }

    &.disabled {
        opacity: 0.6;
    }
}

.prefix {
    display: flex;
    align-items: center;
    padding: 12px 0 12px 14px;
    font-family: var(--font-body);
    font-size: 16px;
    color: var(--color-on-surface-variant);
    user-select: none;
    pointer-events: none;
    white-space: nowrap;
}

input {
    flex: 1;
    min-width: 0;
    border: none;
    padding: 12px 14px 12px 6px;
    font-family: var(--font-body);
    font-size: 16px;
    background: transparent;
    color: var(--color-on-surface);

    &::placeholder {
        color: var(--color-outline);
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
    color: var(--color-error);
}
</style>
