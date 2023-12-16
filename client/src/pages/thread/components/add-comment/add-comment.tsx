import { Button } from '~/libs/components/button/button.js';
import { Input } from '~/libs/components/input/input.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import { CommentPayloadKey } from '~/packages/comment/comment.js';
import { type CreateCommentRequestDto } from '~/packages/comment/libs/types/types.js';

import { DEFAULT_ADD_COMMENT_PAYLOAD } from './libs/constants/constants.js';

type Properties = {
  postId: number;
  onCommentAdd: (payload: CreateCommentRequestDto) => void;
};

const AddComment: React.FC<Properties> = ({ postId, onCommentAdd }) => {
  const { control, handleSubmit, reset } = useAppForm({
    defaultValues: DEFAULT_ADD_COMMENT_PAYLOAD
  });

  const handleAddComment = useCallback(
    (values: Omit<CreateCommentRequestDto, 'postId'>) => {
      if (!values.body) {
        return;
      }
      onCommentAdd({ postId, body: values.body });
      reset();
    },
    [postId, reset, onCommentAdd]
  );

  return (
    <form name="comment" onSubmit={handleSubmit(handleAddComment)}>
      <Input
        name={CommentPayloadKey.BODY}
        placeholder="Type a comment..."
        rows={10}
        control={control}
      />
      <Button type="submit" isPrimary>
        Post comment
      </Button>
    </form>
  );
};

export { AddComment };
