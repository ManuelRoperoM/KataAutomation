export class TodoBuilder {
    private title = `Todo ${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    private completed = false;
  
    withTitle(title: string) {
      this.title = title;
      return this;
    }
  
    completedTask() {
      this.completed = true;
      return this;
    }
  
    activeTask() {
      this.completed = false;
      return this;
    }
  
    build() {
      return {
        title: this.title,
        completed: this.completed,
      };
    }
  }