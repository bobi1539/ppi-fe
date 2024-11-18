import ButtonDropdown from "@/app/components/button/button-dropdown";
import MotionAction from "@/app/components/motion/motion-action";
import { ICON_DELETE, ICON_EDIT, ICON_EMAIL, ICON_RESTORE, TEXT_COLOR_DELETE, TEXT_COLOR_RESTORE, TEXT_DELETE, TEXT_EDIT, TEXT_RESEND_EMAIL, TEXT_RESTORE } from "@/app/constants/constant";

interface ActionCardProps {
  deleted: boolean;
  handleEdit: () => void;
  handleDelete: () => void;
  handleRestore: () => void;
  isResendEmail?: boolean;
  handleResendEmail?: () => void;
}

export default function ActionCard(props: Readonly<ActionCardProps>) {
  const defaultResendEmail = (): void => {
    console.log("Default");
  };

  return (
    <MotionAction>
      {props.deleted ? (
        <ButtonDropdown onClick={props.handleRestore} icon={ICON_RESTORE} text={TEXT_RESTORE} textColor={TEXT_COLOR_RESTORE} />
      ) : (
        <>
          {props.isResendEmail ? <ButtonDropdown onClick={props.handleResendEmail ?? defaultResendEmail} icon={ICON_EMAIL} text={TEXT_RESEND_EMAIL} /> : ""}
          <ButtonDropdown onClick={props.handleEdit} icon={ICON_EDIT} text={TEXT_EDIT} />
        </>
      )}
      <ButtonDropdown onClick={props.handleDelete} icon={ICON_DELETE} text={TEXT_DELETE} textColor={TEXT_COLOR_DELETE} />
    </MotionAction>
  );
}
