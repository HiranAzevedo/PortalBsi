class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here. For example:
    #
    #   user ||= User.new # guest user (not logged in)
    #   if user.admin?
    #     can :manage, :all
    #   else
    #     can :read, :all
    #   end
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities
    if user && user.persisted? && user.role == "administrador" # Logged-in user
      # User can destroy his/her own post
      can :manage, :all
      # Non-logged in users cannot destroy Posts.
      # Typically, can is used a lot more than cannot.
      # cannot :destroy, Post, user_id: nil
    elsif user && user.persisted? && user.role == "aluno"
      can [:edit, :update, :salva_publicado, :publicar], Tcc, ['user_id = ?', user.id] do |tcc|
        tcc.user_id == user.id
      end
      can [:new,:create,:tipos,:modelo,:processo,:agenda,:publicacoes,:index], Tcc
      can :read,:update, User
      can [:read, :home, :index, :bolsas_permanencia, :jovens_talentos, :monitoria, :iniciacao_cientifica, :ciencia_sem_fronteira, :mobilidade_academica], Oportunidade
    elsif user && user.persisted? && user.role == "representante_de_empresa"	
	  can [:tipos,:modelo,:processo,:agenda,:publicacoes,:index], Tcc
	  cannot :salva_publicacao, Tcc
      can :read, Professor
      can :read, User
      can [:read, :create, :home, :index, :bolsas_permanencia, :jovens_talentos, :monitoria, :iniciacao_cientifica, :ciencia_sem_fronteira, :mobilidade_academica], Oportunidade       
    else
      can [:tipos,:modelo,:processo,:agenda,:publicacoes,:index], Tcc
      can :read, Professor
      can :read, User
      can [:read, :home, :index, :bolsas_permanencia, :jovens_talentos, :monitoria, :iniciacao_cientifica, :ciencia_sem_fronteira, :mobilidade_academica], Oportunidade
      can [:new, :create], Empresa  
    end
  end
end