import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateMyUserProfileRequestDto } from './update-my-user-profile-request.dto';

describe('UpdateMyUserProfileRequestDto', () => {
  it('trims required and nullable string fields', async () => {
    const dto = plainToInstance(UpdateMyUserProfileRequestDto, {
      firstName: ' Ana ',
      phoneNumber: ' 061 123 456 ',
    });

    await expect(validate(dto)).resolves.toEqual([]);
    expect(dto).toEqual({
      firstName: 'Ana',
      phoneNumber: '061 123 456',
    });
  });

  it.each(['firstName', 'lastName', 'displayName', 'city'])(
    'rejects whitespace-only %s',
    async (field) => {
      const dto = plainToInstance(UpdateMyUserProfileRequestDto, {
        [field]: '   ',
      });

      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual(field);
    },
  );

  it.each(['phoneNumber', 'municipality', 'addressLine', 'bio'])(
    'keeps explicit null for %s',
    async (field) => {
      const dto = plainToInstance(UpdateMyUserProfileRequestDto, {
        [field]: null,
      });

      await expect(validate(dto)).resolves.toEqual([]);
      expect(dto[field as keyof UpdateMyUserProfileRequestDto]).toBeNull();
    },
  );

  it('normalizes a blank nullable field to null', async () => {
    const dto = plainToInstance(UpdateMyUserProfileRequestDto, { bio: '   ' });

    await expect(validate(dto)).resolves.toEqual([]);
    expect(dto.bio).toBeNull();
  });

  it('rejects account fields under the application whitelist policy', async () => {
    const dto = plainToInstance(UpdateMyUserProfileRequestDto, {
      email: 'changed@example.com',
    });

    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0].property).toEqual('email');
  });
});
