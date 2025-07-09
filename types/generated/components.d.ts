import type { Schema, Struct } from '@strapi/strapi';

export interface GoalNote extends Struct.ComponentSchema {
  collectionName: 'components_goal_notes';
  info: {
    description: 'Note related to a goal';
    displayName: 'Note';
    icon: 'file-text';
  };
  attributes: {
    createdAt: Schema.Attribute.Date;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface GoalSubgoal extends Struct.ComponentSchema {
  collectionName: 'components_goal_subgoals';
  info: {
    displayName: 'Subgoal';
    icon: 'check-circle';
  };
  attributes: {
    completed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    description: Schema.Attribute.Text;
    endDate: Schema.Attribute.Date;
    priority: Schema.Attribute.Enumeration<['Low', 'Medium', 'High']> &
      Schema.Attribute.DefaultTo<'Medium'>;
    progress: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    startDate: Schema.Attribute.Date;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HabitCompleteddates extends Struct.ComponentSchema {
  collectionName: 'components_habit_completedDates';
  info: {
    displayName: 'completedDates';
    icon: 'check-circle';
  };
  attributes: {
    completedDates: Schema.Attribute.Date;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'goal.note': GoalNote;
      'goal.subgoal': GoalSubgoal;
      'habit.completeddates': HabitCompleteddates;
    }
  }
}
