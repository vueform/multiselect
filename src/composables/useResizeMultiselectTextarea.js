import useResizeTextarea from '@/composables/useResizeTextarea';

const { resizeTextarea } = useResizeTextarea();

export default function useResizeMultiselectTextarea(props, context, dep) {
  const resizeMultiselectTextarea = async () => {
    const resized = await resizeTextarea(dep.input, props.maxRows);
    if (resized) {
      dep.updatePopper();
    }
  };

  return {
    resizeMultiselectTextarea
  };
}
