export const emailValidator = (email: string): boolean => {
	if (!email) {
		return false;
	}

	if (email.length > 50) {
		return false;
	}
	return true;
};

export const senhaValidator = (senha: string): boolean => {
	if (!senha) {
		return false;
	}
	if (senha.length < 3) {
		return false;
	}
	return true;
};
